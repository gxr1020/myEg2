$(function  () {
	//学生对象模型
	var Student=Backbone.Model.extend({

		validate:function(attrData){
			for(var obj in attrData){
				if(attrData[obj]==""){
					return obj+"不能为空";
				}
				if(obj=='Score' && isNaN(attrData.Score)){
					return '分数必须是数字';
				}
			}
		}

	});
	//模型集合
	var StudentList=Backbone.Collection.extend({
		model:Student
	});
	//实例化一个集合对象
	var Students=new StudentList();
	//构建用于模板的视图
	var StudentView=Backbone.View.extend({
		tagName:'li',   
		className:'li_c',  //此时tagName 和className 被注册到视图的 this.el里
		template:_.template($('#item-template').html()),

		events:{
			'dblclick span':'editing',
			'blur input,select':'blur',
			'click span a':'dele'
		},
		editing:function(e){
			$(e.currentTarget).removeClass('show').addClass('editing').find('input,select').focus();
		},
		blur:function(e){
			var $curele=$(e.currentTarget);
			var objData={};
			objData[$curele.attr('name')]=$curele.val();
			this.model.set(objData,{'validate':true});  //此时会触发change事件
			$(e.currentTarget).parent().parent().removeClass('editing').addClass('show');
		},
		dele:function(){
			console.log('x')
			this.model.destroy();//通过XHR向服务器发送删除。。
		},

		initialize:function(){
			console.log(this.el); //li.li_c
			console.log(this.model); //undefined

			this.model.on('change',this.render,this);
			this.model.on('destroy',this.remove,this);
		},
		render:function(){
			$(this.el).html(this.template(this.model.toJSON()));
			this.setValue();
			return this;
		},

		remove:function(){
			$(this.el).remove(); //移除html
		},
		setValue:function(){
			var model=this.model;
			$(this.el).find('input,select').each(function(){
				var $curele=$(this);
				$curele.val(model.get($curele.attr('name')));
			});
		}

	});
//构建主页视图
var stuAppView=Backbone.View.extend({
	el:$('#stuManager'),
	events:{
		'click #btnAdd':'newstu'
	},
	//绑定collection相关事件
	initialize:function(){
		Students.bind('add',this.addData,this);
		$('#StuID').val(Students.length+1)
	},
	newstu:function(e){
		// console.log('x');
		var stu=new Student();
		var objData={};
		$('#Name,#Sex,#Score').each(function(){
			objData[$(this).attr('name')]=$(this).val();
		});
		stu.bind('invalid',function(model,error){
			$('#pStatus').show().html(error);
		});
		if(stu.set(objData,{'validate':true})){
			Students.add(stu);
			$('#pStatus').hide();
		}

	},
	addData:function(stu){
		stu.set({'StuID':stu.get("StuID")||Students.length});
		var stuView=new StudentView({model:stu});
		$('#ulMessage').append(stuView.render().el);
		$('#Name,#Score').each(function(){
			$(this).val('');
		})
		$('#StuID').val(Students.length+1);

	}
})
var sapp=new stuAppView();

})