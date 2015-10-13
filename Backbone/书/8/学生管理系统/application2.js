var stuModel=Backbone.Model.extend({
	//模型验证
	validate:function (dataModel) {
		for(var obj in dataModel){
			if(dataModel[obj]==""){
				return obj+"不能为空";
			}		
		}
		if(isNaN(dataModel.stuScore)){
			console.log(dataModel)
			return "分数必须是数字";
		}
	},
	// idAttribute:"stuId", //给了id 会删除失败
	initialize:function(){
		this.bind('invalid',function(model,error){
			$('#pStatus').fadeIn(2000).html(error).fadeOut(2000);
		})
	}

});
var stuList=Backbone.Collection.extend({
	model:stuModel
});

var data=[{
	stuId:1,
	stuClassId:'001',
	stuName:'Gxr1',
	stuSex:'男',
	stuScore:100
},{
	stuId:2,
	stuClassId:'002',
	stuName:'Gxr2',
	stuSex:'女',
	stuScore:101
},{
	stuId:3,
	stuClassId:'003',
	stuName:'Gxr3',
	stuSex:'男',
	stuScore:102
}];
var stuColl=new stuList(data);

//模板视图
var stuTmplV=Backbone.View.extend({
	tagName:'li',
	className:'li_c',
	template:_.template($('#stuTmp').html()),
	events:{
		'dblclick span':'editing',
		'blur input,select':'blur',
		'click span a':'dele'
	},
	editing:function(e){
		// console.log(e.currentTarget);
		$(e.currentTarget).removeClass('show').addClass('editing').find('input,select').focus();
	},
	blur:function(e){
		var $tag=$(e.currentTarget);
		var objData={};//因为set 需要是对象才需创建objData
		objData[$tag.attr('name')]=$tag.val();
		this.model.set(objData,{'validate':true}); //设置model 并触发验证 (1.0之前默认就进行验证，无需设置options.validate为true)
		$tag.parent().parent().removeClass('editing').addClass('show');
		$tag.val(this.model.get($tag.attr('name')));
	},
	dele:function(){
		// console.log('x');
		this.model.destroy();
	},
	initialize:function(){
	// console.log('x0')		
		this.model.on('change',this.render,this);
		this.model.on('destroy',this.remove,this);
	},
	render:function(){
		// console.log('x');
		// $(this.el)当前li
		// console.log(this.template(this.model.toJSON()))
		$(this.el).html(this.template(this.model.toJSON()));
		this.setValue();
		// console.log(this.el);
		// $('#ulMessage').append(this.el);
		return this;
	},
	remove:function(){
		console.log('remove');
		$(this.el).remove();
	},
	//当模型改变时改变，设置控件的值
	setValue:function(){
		var model=this.model;
		// console.log(model.get('stuClassId'))
		$(this.el).find('input,select').each(function(){
			$dom=$(this);
			// console.log($dom.attr('name'))
			
			$dom.val(model.get($dom.attr('name')));
		});

	}
});

// 主视图
var stuViewApp=Backbone.View.extend({
	el:'#stuManager',
	events:{
		'click #btnAdd':'newstu'
	},
	initialize:function(){
		stuColl.bind('add',this.addData,this);
		var i,htmlTxt,len=stuColl.models.length;
		$('StuID').val(len+1);
		for(i=0;i<len;i++){
			this.addData(stuColl.models[i]);
		}
	},
	newstu:function(e){
		var stu=new stuModel();
		var objData={};
		$('#stuClassId,#stuName,#stuSex,#stuScore').each(function(){
			objData[$(this).attr('name')]=$(this).val();
		})
		// $()
		if(stu.set(objData,{'validate':true})){
			stuColl.add(stu);
			$('#stuClassId,#stuName,#stuScore').each(function(){
				$(this).val('');
			})
		}
	},
	addData:function(stu){
		stu.set({'stuId':stu.get('stuId')||stuColl.length});
		var sutView=new stuTmplV({model:stu});
		$('#ulMessage').append(sutView.render().el);
		$('#Name,#Score').each(function(){
			$(this).val('');
		})	
		$('#StuID').val(stuColl.length+1);	
	}
});

var stuViewappEg=new stuViewApp();