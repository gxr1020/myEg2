// (function($){
	// $(document).ready(function(){
		//构建人员资料信息数据模块类
		var Person=Backbone.Model.extend({
			defaults:{
				name:"",
				sex:"",
				email:""
			},
			search:function(key){
				if(typeof(key)==='undefined' || key===null || key===''){
					return true;
				}
				key=key.toLowerCase();
				return this.get('name').toLowerCase().indexOf(key) != -1 || this.get('email').toLowerCase().indexOf(key) != -1;
			}

		});
		
		//构建基于模块类的集合类并指定数据缓存对象
		var Persons=Backbone.Collection.extend({
			model:Person,
			localStorage:new Store('person-data')
		});

		//构建“姓名”列表中单个选项的视图
		var PersonItemView=Backbone.View.extend({
			className:'item',    //<div class='item'>template</div>
			template:_.template($('#tpl-item').html()),
			events:{
				'click':'select'   //单击了视图 就会执行 单击执行select方法 
			},
			initialize:function(){ 

				 _.bindAll(this,'select');  //this 绑定 select方法 此时相当于添加 this.select
				
				// console.log(this); //_.bindAll 后会有select方法 会绑定到实例对象中去
				// 
				// 如果不_.bindAll this对象上也会有select  只是在他的 this.__proto__ 的原型上会有 
				// this.__proto__原型上:
						// className: "item"
						// constructor: ()
						// desele: ()
						// events: Object
						// initialize: ()
						// render: ()
						// sele: ()
						// select: ()
						// template: (data)
						// __proto__: Backbone.View
				// 
				// 
				this.model.bind('reset',this.render,this);// 绑定到this.model._events上 绑定到模型的事件对象上
			
				this.model.bind('change',this.render,this);// 绑定到this.model._events上 绑定到模型的事件对象上
				
				this.model.bind('destroy',this.remove,this);// 绑定到this.model._events上 绑定到模型的事件对象上
			
				
			
				if(this.model.view){ 		 //本地的view是空，localStorage本地存储的view不是空！？
					
					// console.log('-------1-------')
					// console.log(this.model.toJSON());
					// console.log('-------End1-------')

					this.model.view.remove();
				}
				this.model.view=this;

					// console.log('-------2-------')
					// console.log(this.model.toJSON());
					// console.log('-------End2-------')
				
			},

			render:function(){

				this.$el.html(this.template(this.model.toJSON())); //this.$el.html=<div class='item'>name</div>

				return this;
			},

			select:function(){
				appRouter.navigate('person/'+this.model.cid,{  //跳转url trigger:true并执行相应方法
					trigger:true 
				}); 
				
			},

			sele:function(){
				this.$el.addClass('sele');
			},
			desele:function(){
				this.$el.removeClass('sele');
			}
		});
		// 构建顶部搜索和新建人员信息的视图类
		var TopView=Backbone.View.extend({
			className:'top',   //<div class="top"></div>
			template:_.template($('#tpl-top').html()),
			events:{
				'click footer button':'create', //点击新建按钮执行 this.create
				'keyup input':'search'
			},
			initialize:function(){
				// console.log(this.model)

				_.bindAll(this,'create','search'); //绑定到实例对象上 如果不绑定则会在原型上找到

				// console.log('------------topView-------------')
				// console.log(this)
				// console.log(this.model)
				// console.log('----------End--topView-------------')

				//此时的this.model 是集合
				this.model.bind('reset',this.renderAll,this);  // 此时绑定到模型集合上的events上
				this.model.bind('add',this.add,this); // 此时绑定到模型集合上的events上
				this.model.bind('remove',this.remove,this);// 此时绑定到模型集合上的events上 
			},

			render:function(){

				$(this.el).html(this.template());   //渲染视图 没item之前
				
				//console.log($(this.el).html())
				//<header>
				// 	<input type="search" autofocus=""></header>
				// 	<div class="items"></div>
				// <footer>
				// 	<button>新建</button>
				// </footer>
			
				this.renderAll();


				// console.log(this.$el.html());
				// 渲染后的视图

				return this;
			},

			//把items 并绑定事件
			renderAll:function(){ //渲染所有
				this.$('.items').empty(); //清除 之前 .tiems 里面的元素
				// this.model.each(function(){
				// console.log('xww');	
				// })
				// console.log(this);
				this.model.each(this.renderOne,this);		//如果绑定this为上下文，外部调用该方法 会导致renderOne的this执行window
				

				this.search();
			},
			//添加一条 item到 视图中的items中
			renderOne:function(contact){  // 渲染单个
				
				// console.log('=---------------');				
				// console.log(this); //如果外部不指定上下文，可能this会是window
				// // console.log(contact.toJSON());
				// // console.log(this.a)
				// console.log('=---------------');

				var view=new PersonItemView({
					model:contact
				});
				
				this.$('.items').append(view.render().el);
			},

			create:function(){
				// console.log('x');
				var contact=new Person();
				this.model.add(contact);
				appRouter.navigate('person/'+contact.cid+'/edit',{
					trigger:true
				});
			},
			//................................................................
			search:function(){
				var key=$('input',this.el).val();
				this.model.each(
					function(contact,element,index,list){
						contact.view.$el.toggle(contact.search(key));
					}
				);
			},
			sele:function(item){
				if(this.seleItem){
					this.seleItem.view.desele();
				}
				this.seleItem=item;
				if(this.seleItem){
					this.seleItem.view.sele();
				}
			},
			add:function(contact){
				this.renderOne(contact);
			},
			remove:function(contact){
				console.log(contact.cid);
			}

		});
		// 构建用于显示个人资料详细页的视图类
		var ShowView=Backbone.View.extend({
			className:'show', //<div class="show"></div>
			template:_.template($('#tpl-show').html()),
			events:{
				'click .edit':'edit'
			},
			initialize:function(){
				_.bindAll(this,'edit');
			},
			render:function(){
				
				if(this.item){
					this.$el.html(this.template(this.item.toJSON()));
					
				}
				return this;
			},
			change:function(item){
				this.item=item;
				this.render();
			},
			edit:function(){
				if(this.item){
					appRouter.navigate('person/'+this.item.cid+'/edit',{
						trigger:true
					});
				}
			}
		});

		// 构建用于编辑个人资料信息的视图类
		var EditView=Backbone.View.extend({
			className:'edit', //<div class="edit"></div>
			template:_.template($('#tpl-edit').html()),
			events:{
				'click .save':'submit',
				'click .dele':'remove'
			},
			initialize:function(){
				_.bindAll(this,'submit','remove');
			},
			render:function(){
				if(this.item){
					this.$el.html(this.template(this.item.toJSON()));
				
				}
				return this;
			},
			change:function(item){
				this.item=item;
				this.render();
			},
			submit:function(){
				this.item.set(this.form());
				this.item.save();
				appRouter.navigate('person/'+this.item.cid,{
					trigger:true
				});
				return false;
			},
			form:function(){
				return {
					name:this.$('#name').val(),
					email:this.$('#email').val(),
					sex:this.$('#sex').val()
				}
			},
			remove:function(){
				this.item.destroy();
				this.item=null;
				appRouter.navigate('',{
					trigger:true
				});
			}
		});

		//构建包含显示编辑视图的主视图类
		var MainView=Backbone.View.extend({
			className:'main unact', //<div class="main unact"></div>
			initialize:function(){
				this.editView=new EditView();
				this.showView=new ShowView();
			},
			render:function(){
				this.$el.append(this.showView.render().el);
				this.$el.append(this.editView.render().el);
				return this;
			},
			edit:function(item){
				this.showView.$el.removeClass('sele');
				this.editView.$el.addClass('sele');
				this.editView.change(item);
			},
			show:function(item){
				this.editView.$el.removeClass('sele');
				this.showView.$el.addClass('sele');
				this.showView.change(item);
			}

		});

		// 构建整个页面的视图类，包含顶部和主视图两个对象
		var AppView=Backbone.View.extend({
			//默认不给tagName则是div
			className:'person',
			initialize:function(){
				console.log(this.model)
				this.top=new TopView({
					model:this.model  //此时的model是collection
				});
				this.main=new MainView();
				this.model.fetch();

				this.render();
			},
			render:function(){

				this.$el.append(this.top.render().el);
				this.$el.append(this.main.render().el);
				$('#info').append(this.el);
				return this;
			},
			show:function(item){
				this.top.sele(item);
				this.main.show(item);
			},
			edit:function(item){
				this.top.sele(item);
				this.main.edit(item);
			}

		});

		// 构建路由导航类，根据不同Hash执行对应方法
		var AppRouter=Backbone.Router.extend({
			routes:{
				'':'show',
				'person/:id':'show',
				'person/:id/edit':'edit'
			},
			show:function(id){
				if(id!=undefined){
					appView.show(this.getPerson(id));
				}else{
					appView.show(person.first());
				}
			},
			edit:function(id){
				appView.edit(this.getPerson(id));
			},
			getPerson:function(id){
				return person.get(id);
			}
		});

		var dataList=[{
			name:"gxr",
			sex:"男",
			email:"xxx@163.com"
		},{
			name:"gxr2",
			sex:"女",
			email:"x2x2x@163.com"
		},{
			name:"gxr3",
			sex:"男",
			email:"x3x3x@163.com"
		}];

		var person=new Persons(dataList);


		//实例化一个整体页面视图对象，启动各个数据绑定和渲染功能
		window.appView=new AppView({
			model:person
		});
		//实例化一个路由导航对象
		window.appRouter=new AppRouter();
		//开启路由导航功能
		Backbone.history.start();

	// });
// })(jQuery);

