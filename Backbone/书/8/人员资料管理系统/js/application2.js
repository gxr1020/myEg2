var Person = Backbone.Model.extend({
	defaults: {
		name: '',
		sex: '',
		personal: '',
		score: ''
	},
	search: function(key) {
		if (typeof(key) === 'undefined' || key === null || key === '') {
			return true;
		}
		key = key.toLowerCase(); // 搜索值转小写
		return this.get('name').toString().toLowerCase().indexOf(key) != -1 || this.get('sex').toString().toLowerCase().indexOf(key) != -1 || this.get('personal').toString().toLowerCase().indexOf(key) != -1 || this.get('score').toString().toLowerCase().indexOf(key) != -1;
	}
});

//集合
var Persons=Backbone.Collection.extend({
	model:Person,
	localStorage:new Store('person-data2') ///创建本地存储
});

var dataList=[{
	name:'Gxr1',
	sex:'男',
	personal:'这就是第一个人',
	score:1111
},{
	name:'Gxr2',
	sex:'女',
	personal:'这就是第二个人',
	score:2222
},{
	name:'Gxr3',
	sex:'女',
	personal:'这就是第三个人',
	score:3333
},{
	name:'Gxr4',
	sex:'男',
	personal:'这就是第四个人',
	score:4444
}];




// item视图
var PersonItemView=Backbone.View.extend({
	className:'item',
	template:_.template($('#tpl-item').html()),
	events:{
		'click':'select'
	},
	initialize:function(){
		_.bindAll(this,'select');
		this.model.bind('reset',this.render,this);
		this.model.bind('change',this.render,this);
		this.model.bind('destroy',this.remove,this);
		if(this.model.view){
			this.model.view.remove();
		}
		// console.log(this)
		this.model.view=this;
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	select:function(){
		appRouter.navigate('person/'+this.model.cid,{
			trigger:true
		})
	},
	sele:function(){
		this.$el.addClass('sele');
	},
	desele:function(){
		this.$el.removeClass('sele');
	}

});

var TopView=Backbone.View.extend({
	className:'top',
	template:_.template($('#tpl-top').html()),
	events:{
		'click footer button':'create',
		'keyup input':'search'
	},
	initialize:function(){
		_.bindAll(this,'create','search');//绑定create 和search
		this.model.bind('reset',this.renderAll,this);
		this.model.bind('add',this.add,this);
		this.model.bind('remove',this.remove,this);
		// ==================
		this.render();
		// ==================

	},
	render:function(){
		$(this.el).html(this.template());
		this.renderAll();
		// $('.person').append(this.el);
		return this;
	},

	renderAll:function(){
		this.$('.items').empty();
		this.model.each(this.renderOne,this);
		this.search();
	},
	renderOne:function(contact){ //contact为当前模型
		var view=new PersonItemView({model:contact});
		this.$('.items').append(view.render().el);
	},

	create:function(){
		var contact=new Person();
		this.model.add(contact);
		appRouter.navigate('person/'+contact.cid+'/edit',{
			trigger:true
		});
	},
	search:function(){
		// console.log('x');
		var key=$('input',this.el).val();//在当前this.el下查找input
		this.model.each(
			function(contact,element,index,list){
				contact.view.$el.toggle(contact.search(key));
			}
		)

	},
	sele:function(item){
		if(this.seleItem){
			this.seleItem.view.desele();
		}
		// console.log(item.view);
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
	
var ShowView=Backbone.View.extend({
	className:'show',
	template:_.template($('#tpl-show').html()),
	events:{
		'click .edit':'edit'
	},
	initialize:function(){
		_.bindAll(this,'edit');
		// console.log(this.model);
		// this.item=this.model;
		// this.render();
	},
	render:function(){
		// console.log(this.item)
		if(this.item){
			// console.log(this.$el.html())
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

var EditView=Backbone.View.extend({
	className:'edit',
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
		this.$('#sex').val(this.item.get('sex'));

	},
	submit:function(){
		this.item.set(this.form());
		this.item.save();
		appRouter.navigate('person/'+this.item.cid,{
			trigger:true
		});
		return false;
	},
	//获取表单数据
	form:function(){

		return{
			name:this.$('#name').val(),
			sex:this.$('#sex').val(),
			personal:this.$('#personal').val(),
			score:this.$('#score').val()
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

var MainView=Backbone.View.extend({
	className:'main unact',
	initialize:function(){
		this.editView=new EditView();
		this.showView=new ShowView();
		// this.render();
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
})


var AppView=Backbone.View.extend({
	className:'person',
	initialize:function(){
		this.top=new TopView({
			model:this.model
		});
		this.main=new MainView();
		// this.model.fetch();//fetch请求服务器处理(save)
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


// 路由
var AppRouter=Backbone.Router.extend({
	routes:{
		'':'show',
		'person/:id':'show',
		'person/:id/edit':'edit'
	},
	show:function(id){
		console.log(id)
		if(id!=undefined){			
			appV.show(this.getPerson(id));
		}else{			
			appV.show(personColl.first());
		}
	},
	edit:function(id){		
		appV.edit(this.getPerson(id));
	},
	getPerson:function(id){
		return personColl.get(id);
	}
})

var personColl=new Persons(dataList);
// var topV=new TopView({'model':personColl});
var appV=new AppView({model:personColl});

// var mainV=new MainView();


var appRouter=new AppRouter();
Backbone.history.start();