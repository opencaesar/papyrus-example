/**
 * create a D3 based Tree table
 */

function treeTable(data, containerID) {
	var container = d3.select(containerID);
	var mainDiv = container.append('div');
	var columns = data.columns;

	var sections = mainDiv.selectAll('button').data(data.roots).enter().append('button')
					.attr("type","button")
					.classed("collapsible", true)
					.text(function (d) {
	  			 		return d[columns[1]];
	  					})
	  				.append('div')
	  				.classed("content",true)
	  				.on("click", toggle);
	
	function toggle(d,i){
		i = d3.select(this);
		console.log(i);
	}
	
	sections.selectAll('p')
				.data(function (row) {
	    			return row.children;
	  			}).enter().append('p').text(function (d) {
	  			 	return "        " + d[columns[3]] + " : " + d[columns[2]] ;
	  		}).style("color","black");
  			
	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
	  	coll[i].addEventListener("click", function() {
	    	this.classList.toggle("active");
	    	var content = this.children;
	    	for (l = 0; l < content.length; l++) {
		    	if (content[l].style.display === "block") {
		      		content[l].style.display = "none";
		    	} else {
		      		content[l].style.display = "block";
		    	}
		    }
	  	});
	}
	  
  	return table;
}


