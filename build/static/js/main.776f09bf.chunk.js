(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(40)},38:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(11),u=t.n(o),c=t(12),i=t(2),l=t(3),m=t.n(l),s="/api/persons",f=function(){return m.a.get(s).then(function(e){return e.data})},d=function(e){return m.a.post(s,e).then(function(e){return e.data})},v=function(e){return m.a.delete("".concat(s,"/").concat(e)).then(function(e){return e.data})},p=function(e,n){return m.a.put("".concat(s,"/").concat(e),n).then(function(e){return e.data})},E=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"notification"},n)},b=function(e){var n=e.errorMessage;return null===n?null:r.a.createElement("div",{className:"notification error-notification"},n)},h=function(e){var n=e.person,t=e.removePerson;return r.a.createElement("button",{onClick:function(){return t(n)}},"remove")},w=function(e){var n=e.person,t=e.removePerson;return r.a.createElement("p",null,n.name," ",n.number," ",r.a.createElement(h,{person:n,removePerson:t}))},j=function(e){var n=e.persons,t=e.newFilter,a=e.removePerson;return(t?n.filter(function(e){return e.name.toLocaleLowerCase().includes(t.toLocaleLowerCase())}):n).map(function(e){return r.a.createElement(w,{key:e.name,person:e,removePerson:a})})},O=function(e){var n=e.value,t=e.handler;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:n,onChange:t}))},g=function(e){var n=e.personValue,t=e.personHandler,a=e.numberValue,o=e.numberHandler,u=e.addPerson;return r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:n,onChange:t})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:a,onChange:o}))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},P=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),l=Object(i.a)(u,2),m=l[0],s=l[1],h=Object(a.useState)(""),w=Object(i.a)(h,2),P=w[0],L=w[1],C=Object(a.useState)(""),k=Object(i.a)(C,2),S=k[0],H=k[1],y=Object(a.useState)(null),V=Object(i.a)(y,2),N=V[0],F=V[1],J=Object(a.useState)(null),M=Object(i.a)(J,2),T=M[0],x=M[1];Object(a.useEffect)(function(){f().then(function(e){o(e)})},[]);var B=function(e){F(e),setTimeout(function(){F(null)},3e3)},D=function(e){x(e),setTimeout(function(){x(null)},3e3)};return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(E,{message:N}),r.a.createElement(b,{errorMessage:T}),r.a.createElement(O,{value:S,handler:function(e){H(e.target.value)}}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement(g,{personValue:m,personHandler:function(e){s(e.target.value)},numberValue:P,numberHandler:function(e){L(e.target.value)},addPerson:function(e){if(e.preventDefault(),t.map(function(e){return e.name.toLowerCase()}).includes(m.toLowerCase())){var n=t.find(function(e){return e.name.toLowerCase()===m.toLocaleLowerCase()});if(window.confirm("".concat(n.name," on jo luettelossa, korvataanko vanha numero uudella?"))){var a=Object(c.a)({},n,{number:P});p(n.id,a).then(function(e){o(t.map(function(t){return t.id!==n.id?t:e})),s(""),L(""),B("P\xe4ivitettiin ".concat(a.name))})}}else d({name:m,number:P}).then(function(e){o(t.concat(e)),s(""),L(""),B("Lis\xe4ttiin ".concat(e.name))})}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(j,{persons:t,newFilter:S,removePerson:function(e){window.confirm("Poistetaanko ".concat(e.name))&&v(e.id).then(function(){B("Poistettiin ".concat(e.name)),o(t.filter(function(n){return n.id!==e.id}))}).catch(function(n){D("Henkil\xf6 ".concat(e.name," oli jo poistettu")),o(t.filter(function(n){return n.id!==e.id}))})}}))};t(38);u.a.render(r.a.createElement(P,null),document.getElementById("root"))}},[[13,2,1]]]);
//# sourceMappingURL=main.776f09bf.chunk.js.map