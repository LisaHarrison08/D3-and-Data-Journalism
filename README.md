# D3 - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! 

This project analyzes the current trends shaping people's lives through the creation of charts, graphs, and interactive elements which aims to help readers understand the findings.

The data set included with the project is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/). The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

### Section 1: D3 Dabbler 

![4-scatter](Images/4-scatter.jpg)

Created a scatter plot between two of the data variables - such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Used D3 techniques to create a scatter plot that represents each state with circle elements. 

* Includes state abbreviations in the circles.

* Created and situated the axes and labels to the left and bottom of the chart.

### Section 2: Impress the Boss 

Why make a static graphic when D3 lets you interact with your data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

Included more demographics and more risk factors. Placed additional labels in the scatter plot and gave them click events so that the users can decide which data to display. Animated the transitions for the circles' locations as well as the range of the axes. 

#### 2. Incorporated d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. 

Added tooltips to the circles and displayed each tooltip with the data that the user has selected. 

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.
