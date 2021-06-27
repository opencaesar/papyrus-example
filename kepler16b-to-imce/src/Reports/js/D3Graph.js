/**
 * Graph Vis
 */
function getOrCreateNode(id, name,nodes, dict){
	var node = dict[id];
	if (!node){
		node = {}
		node.id  = id;
		node.name = name;
		nodes.push(node);
		dict[id] = node;
	}
	return node;
}

function toGraphData(data){
	var graph = {};
	var nodes = graph.nodes = [];
	var links = graph.links = [];
	var idToNode = [];
	var columns = data.head.vars;
	data.results.bindings.forEach(item => {
		var srcID = item[columns[0]].value;
		var srcName = item[columns[1]].value;
		var trgtID = item[columns[2]].value;
		var trgtName = item[columns[3]].value;
		var src = getOrCreateNode(srcID,srcName,nodes,idToNode);
		var trgt = getOrCreateNode(trgtID,trgtName,nodes,idToNode);
		var link = {};
		link.source = src.id;
		link.target = trgt.id;
		links.push(link);
	});	
	return graph;
}


function drawGraph(data,containerID,width=960,height=600){
	var graph = toGraphData(data)
	var container = d3.select(containerID);
	var svg = container.append('svg').attr("width",width).attr("height",height);
    // arrow def
	svg.append('defs').append('marker')
        .attr('id','arrowhead')
		.attr('viewBox','-0 -5 10 10')
		.attr('refX',13)
		.attr('refY',0)
		.attr('orient','auto')
		.attr('markerWidth',13)
        .attr('markerHeight',13)
        .attr('xoverflow','visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke','none');

	var nodes = graph.nodes;
	var links = graph.links;
	var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {return d.id;}).distance(80))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));

	var link = svg.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr('marker-end','url(#arrowhead)')

   	var node = svg.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag",  dragged)
					.on("end", dragended));

        node.append("circle")
            .attr("r", 5)
            .style("fill", "red")

        node.append("title")
            .text(function (d) {return d.name;});

		node.append("text")
            .attr("dy", -3)
            .text(function (d) {return d.id});

		simulation.nodes(nodes).on("tick", ticked);

        simulation.force("link").links(links);

	function ticked() {
        link
            .attr("x1", function (d) {return d.source.x;})
            .attr("y1", function (d) {return d.source.y;})
            .attr("x2", function (d) {return d.target.x;})
            .attr("y2", function (d) {return d.target.y;});

        node
            .attr("transform", function (d) {return "translate(" + d.x + ", " + d.y + ")";});

    }


    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x;
    	event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
    	event.subject.fy = event.y;
    }

	function dragended(event) {
    	if (!event.active) simulation.alphaTarget(0);
    	event.subject.fx = null;
    	event.subject.fy = null;
  	}
}