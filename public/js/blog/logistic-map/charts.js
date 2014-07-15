window.d3.csv('/js/blog/logistic-map/data.csv', function(error, data) {
  data.forEach(function(d) {
    d.a = +d.a
    d.b = +d.b
  })

  var w = 600
    , h = 270
    , margin = { top: 50, right: 10, bottom: 25, left: 55}
    , y = window.d3.scale.linear().domain([0, 1]).range([0 + margin.top, h - margin.bottom])
    , x = window.d3.scale.linear().domain([0, 50]).range([0 + margin.left, w - margin.right])

  var vis = window.d3.select('.graph-01')
        .append('svg:svg')
        .attr('width', w)
        .attr('height', h)


vis.selectAll('line.horizontalGrid').data(y.ticks(5)).enter()
    .append('line').attr(
      { 'class':'horizontalGrid'
      , 'x1' : margin.left - 10
      , 'x2' : w
      , 'y1' : function(d){ return y(d)}
      , 'y2' : function(d){ return y(d)}
      , 'fill' : 'none'
      , 'shape-rendering' : 'crispEdges'
      , 'stroke' : '#EEE'
      , 'stroke-width' : '1px'
      })
    .attr('transform', 'translate(0, '+ - margin.bottom + ')')

  var g = vis.append('svg:g')
        .attr('transform', 'translate(0, '+ h + ')')

  var line1 = window.d3.svg.line()
        .x(function(d,i) { return x(i) })
        .y(function(d) { return -1 * y(d.a) })

  var line2 = window.d3.svg.line()
        .x(function(d,i) { return x(i) })
        .y(function(d) { return -1 * y(d.b) })

  g.append('svg:path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line1)
      .style('stroke', 'OLIVEDRAB')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '10,5')

  g.append('svg:path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line2)
      .style('stroke', 'DARKOLIVEGREEN')
      .style('stroke-width', 2)

  // legend
  g.append('svg:line')
      .attr('class', 'line')
      .attr('x1', 330)
      .attr('x2', 360)
      .attr('y2', - h + 10)
      .attr('y1', - h + 10)
      .style('stroke', 'DARKOLIVEGREEN')
      .style('stroke-width', 2)

  g.append('svg:line')
      .attr('class', 'line')
      .attr('x1', 445)
      .attr('x2', 475)
      .attr('y2', - h + 10)
      .attr('y1', - h + 10)
      .style('stroke', 'OLIVEDRAB')
      .style('stroke-width', 1)
      .style('stroke-dasharray', '10,5')

  vis.append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'left')
      .attr('x', 370)
      .attr('y', 14)
      .text('x = 0.1')

  vis.append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', 570)
      .attr('y', 14)
      .text('x = 0.10000001')

  g.append('svg:line')
      .attr('x1', x(0))
      .attr('y1', -1 * y(0))
      .attr('x2', x(w))
      .attr('y2', -1 * y(0))

  g.append('svg:line')
      .attr('x1', x(0))
      .attr('y1', -1 * y(0))
      .attr('x2', x(0))
      .attr('y2', -1 * y(1))

  vis.append('text')
    .attr('class', 'x label')
    .attr('text-anchor', 'middle')
    .attr('x', w / 2)
    .attr('y', h - 10)
    .text('t')

  vis.append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'middle')
    .attr('x', 10)
    .attr('y', h / 2 - 8)
    .text('x')

  g.selectAll('.xLabel')
      .data(x.ticks(5))
      .enter().append('svg:text')
      .style('font-size','12px')
      .attr('class', 'xLabel')
      .text(String)
      .attr('x', function(d) { return x(d) })
      .attr('y', -30)
      .attr('text-anchor', 'middle')

  g.selectAll('.yLabel')
      .data(y.ticks(10))
      .enter().append('svg:text')
      .style('font-size','12px')
      .attr('class', 'yLabel')
      .text(String)
      .attr('x', 20)
      .attr('y', function(d) { return -1 * y(d) })
      .attr('text-anchor', 'right')
      .attr('dy', 4)

  g.selectAll('.xTicks')
      .data(x.ticks(5))
      .enter().append('svg:line')
      .attr('class', 'xTicks')
      .attr('x1', function(d) { return x(d) })
      .attr('y1', -1 * y(0))
      .attr('x2', function(d) { return x(d) })
      .attr('y2', -1 * y(-0.3))

  g.selectAll('.yTicks')
      .data(y.ticks(4))
      .enter().append('svg:line')
      .attr('class', 'yTicks')
      .attr('y1', function(d) { return -1 * y(d) })
      .attr('x1', x(-0.3))
      .attr('y2', function(d) { return -1 * y(d) })
      .attr('x2', x(0))

})
