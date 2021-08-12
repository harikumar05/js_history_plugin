window.onload=init;

function init(){
	const historylinks_array=document.querySelectorAll(".historylink");
	[...historylinks_array].map(link =>{
		link.addEventListener("click",ev => {
			ev.preventDefault();
			let page_url=link.href;
			let page_state=link.id;
			history.pushState(page_state,'',page_url);
			fetch(page_url)
			.then(res => res.text())
			.then(htmloutput => {
				let domparser=new DOMParser();
				let html_parsed=domparser.parseFromString(htmloutput,"text/html");
				document.querySelector('.content').innerHTML=html_parsed.querySelector('.content').innerHTML;
			})
			.catch(err => {
				document.querySelector('.content').innerHTML=`Issue in loading page : ${err}`;	
			})
		})
	});
	const dateobj=new Date();
	document.querySelector('.logdetails').innerHTML=`${dateobj.getHours()}:${dateobj.getMinutes()}:${dateobj.getSeconds()}`;
}