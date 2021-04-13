var tmmvc={};
tmmvc.model=null;
var textField={};
var checkBox={};
var radioButton={};
var singleAttributeComboBox={};
var multipleAttributeComboBox={};
var fieldReference=[];
var fieldData=[];
var tmmvc_ifComponents=[];
var tmmvc_buttons=[];
var replaceString="";

function updateInnerHTML()
{
for(var e=0;e<fieldData.length;e++)
{
fieldReference[e].innerHTML=eval(fieldData[e]);
}
}

function updateUI()
{
for(var e=0;e<tmmvc_ifComponents.length;e++)
{
condition=tmmvc_ifComponents[e].getAttribute("tmmvc_if");
if(eval("tmmvc.model."+condition))
{
tmmvc_ifComponents[e].style.display="block";
}
else
{
tmmvc_ifComponents[e].style.display="none";
}
}
updateInnerHTML()
}


function getInnerHTML(data)
{
let e=0;
let si=0;
let ei=0;
let key="";
let count=0;
let finalString="";
while(data.indexOf("{{{",e)>=0)
{
e=data.indexOf("{{{",e)+1;
if(finalString.length==0 && count!=e) finalString+="\""+data.substring(count,e-1)+"\"";
else finalString+="+\""+data.substring(count,e-1)+"\"";
count=e-1;
si=e;
e=e+1;
ei=data.indexOf("}}}",e)+1;
if(ei==-1)
{
break;
}
else
{
key=data.substring(si+2,ei-1);
if(finalString.length==0) finalString+="eval(\"tmmvc.model."+key+"\")";
else finalString+="+eval(\"tmmvc.model."+key+"\")";
count=ei+2;
}
}
if(count<=data.length) finalString+="+\""+data.substring(count)+"\"";
return finalString;
}

function storeInitialData()
{
headings=document.getElementsByTagName('h1');
let flag=false;
for(var e=0;e<headings.length;e++)
{
let data=headings[e].innerHTML;
if(data.search("{{{")!=-1 && data.search("}}}")!=-1)
{
fieldReference[fieldReference.length]=headings[e];
fieldData[fieldData.length]=getInnerHTML(data);
}
}

paragraphs=document.getElementsByTagName('p');
flag=false;
for(var e=0;e<paragraphs.length;e++)
{
let data=paragraphs[e].innerHTML;
if(data.search("{{{")!=-1 && data.search("}}}")!=-1)
{
fieldReference[fieldReference.length]=paragraphs[e];
fieldData[fieldData.length]=getInnerHTML(data);
}
}

}



function initializeUI()
{
let allTags=document.getElementsByTagName("*");
let x;
let t=null;
let a=null;
x=0;
while(x<allTags.length)
{
t=allTags[x];
if(t.hasAttribute("tmmvc_if"))
{
tmmvc_ifComponents[tmmvc_ifComponents.length]=t;
}
if(t.type=="button" && t.hasAttribute("tmmvc_click"))
{
tmmvc_buttons[tmmvc_buttons.length]=t;
}
x++;
}
}

function setOnClickToButtons()
{
for(var e=0;e<tmmvc_buttons.length;e++)
{
tmmvc_buttons[e].onclick=function(){
functionName=this.getAttribute("tmmvc_click");
eval("tmmvc.controller."+functionName+"()");
};//function defination ends here;
}
}


function initializeComponents()
{
storeInitialData();
initializeUI();
setOnClickToButtons();
inputs=document.getElementsByTagName('input');
for(var e=0;e<inputs.length;e++)
{
if(inputs[e].hasAttribute("tmmvc_attribute"))
{
type=inputs[e].getAttribute("type");
if(type=="text" || type=="number" || type=="password")
{
keyName=inputs[e].getAttribute("tmmvc_attribute");
eval("textField."+keyName+"=inputs[e]");
inputs[e].oninput=function(){
let bindTo="value";
if(this.hasAttribute("tmmvc_bind_to")) bindTo=this.getAttribute("tmmvc_bind_to");
tmmvc.model[this.getAttribute("tmmvc_attribute")]=eval("this."+bindTo);
};//function definition ends here
}//if ends here
if(type=="checkbox")
{
keyName=inputs[e].getAttribute("tmmvc_attribute");
eval("checkBox."+keyName+"=inputs[e]");
inputs[e].oninput=function(){
let bindTo="checked";
if(this.hasAttribute("tmmvc_bind_to")) bindTo=this.getAttribute("tmmvc_bind_to");
tmmvc.model[this.getAttribute("tmmvc_attribute")]=eval("this."+bindTo);
};//function definition ends here
}//if ends here
if(type=="radio")
{
if(inputs[e].getAttribute("tmmvc_attribute") in radioButton)
{
lt=radioButton[inputs[e].name];
lt[lt.length]=inputs[e];
}else
{
lt=[];
lt[0]=inputs[e];
eval("radioButton."+inputs[e].getAttribute("tmmvc_attribute")+"=lt");
}
inputs[e].oninput=function(){
let bindTo="value";
if(this.hasAttribute("tmmvc_bind_to")) bindTo=this.getAttribute("tmmvc_bind_to");
if(this.checked)
{
tmmvc.model[this.getAttribute("tmmvc_attribute")]=eval("this."+bindTo);
}
};//function definition ends here
}//if ends here
}//if ends here
}//loop ends here

selects=document.getElementsByTagName('select');
for(var e=0;e<selects.length;e++)
{
if(selects[e].hasAttribute("tmmvc_attribute"))
{
if(selects[e].hasAttribute("multiple"))
{
keyName=selects[e].getAttribute("tmmvc_attribute");
eval("multipleAttributeComboBox."+keyName+"=selects[e]");
selects[e].onchange=function(){
selectedOptions=this.selectedOptions;
lt=[]
for(j=0;j<selectedOptions.length;j++) lt[j]=selectedOptions[j].value;
tmmvc.model[this.getAttribute("tmmvc_attribute")]=lt;
};
}else
{
keyName=selects[e].getAttribute("tmmvc_attribute");
eval("singleAttributeComboBox."+keyName+"=selects[e]");
selects[e].onchange=function(){
let bindTo="selectedIndex";
if(this.hasAttribute("tmmvc_bind_to")) bindTo=this.getAttribute("tmmvc_bind_to");
tmmvc.model[this.getAttribute("tmmvc_attribute")]=eval("this."+bindTo);
};//function definition ends here
}
}//if has Attribute ends here
}// for loop ends here
setInterval(updateComponents,100);
}//function definition ends here




function updateComponents()
{
for(var key in tmmvc.model)
{ 
if(key in textField)
{
textField[key].value=tmmvc.model[key];
}else if(key in checkBox)
{
checkBox[key].checked=tmmvc.model[key];
}else if(key in radioButton)
{
lt=radioButton[key];
val=tmmvc.model[key];
var f;
for(f=0;f<lt.length;f++)
{
if(val==lt[f].value)
{
lt[f].checked=true;
break;
}
}
if(f==lt.length)
{
for(f=0;f<lt.length;f++) lt[f].checked=false;
}
}
else if(key in singleAttributeComboBox)
{
singleAttributeComboBox[key].selectedIndex=tmmvc.model[key];
}else if(key in multipleAttributeComboBox)
{
lt=tmmvc.model[key];
for(e=0;e<lt;e++) multipleAttributeComboBox.selectedIndex=lt[e];
}
else continue;
}
updateUI();
}

setTimeout(initializeComponents,100);