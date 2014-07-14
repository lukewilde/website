var margin =
    { top: 20
    , right: 20
    , bottom: 30
    , left: 50
    }
  , width = 960 - margin.left - margin.right
  , height = 500 - margin.top - margin.bottom
  // , x = window.d3.scale.linear().range([0, width])
  // , y = window.d3.scale.linear().range([height, 0])
  , x = window.d3.scale.linear().domain([1, 200]).range([0, width])
  , y = window.d3.scale.linear().domain([0, 1]).range([0 + margin.top, height])
  , xAxis = window.d3.svg.axis().scale(x).orient('bottom')
  , yAxis = window.d3.svg.axis().scale(y).orient('left')

  console.log(width)

var line1 = window.d3.svg.line()
    .x(function(d, i) { return x(i) })
    .y(function(d) { return y(d.a) })

var line2 = window.d3.svg.line()
    .x(function(d, i) { return x(i) })
    .y(function(d) { return y(d.b) })

var svg = window.d3.selectAll('.graph-01').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

window.d3.csv('/js/blog/logistic-map/data.csv', function(error, data) {
  data.forEach(function(d) {
    d.a = +d.a
    d.b = +d.b
  })

  x.domain(window.d3.extent(data, function(d) { return d.a }))
  y.domain(window.d3.extent(data, function(d) { return d.b }))

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Population Size (X)')

  svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line1)

  svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line2)
})
