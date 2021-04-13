function clearForm(ds)
{
ds.name="";
ds.gender="";
ds.isHandicaped=false;
ds.city=-1;
return false;
}

class Student
{
constructor()
{
this.ds={
"formName":"",
"mode":'W',
"name": "",
"gender":"",
"city":-1,
"isHandicaped":false
};
}
displayAddForm()
{
this.ds.formName="Add Student";
this.ds.mode='A';
}
displayUpdateForm()
{
this.ds.formName="Update Student";
this.ds.mode='U';
}
displayDeleteForm()
{
this.ds.formName="Delete Student";
this.ds.mode='D';
}
displayHomePage()
{
this.ds.mode='W';
}
add()
{
alert("Name:"+this.ds.name+" , Gender:"+this.ds.gender+" , City:"+this.ds.city+" , is Handicaped:"+this.ds.isHandicaped+" Added successfully");
}
update()
{
alert("Name:"+this.ds.name+" , Gender:"+this.ds.gender+" , City:"+this.ds.city+" , is Handicaped:"+this.ds.isHandicaped);
}
delete()
{
alert("Name:"+this.ds.name+" , Gender:"+this.ds.gender+" , City:"+this.ds.city+" , is Handicaped:"+this.ds.isHandicaped);
}
}
var c=new Student;
window.addEventListener('load',function(){
tmmvc.controller=c;
tmmvc.model=c.ds;
});