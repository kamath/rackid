var circle = (cx, cy, r, stroke, strokeWidth, fill) => {
    var tag = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    tag.setAttribute("cx", cx)
    tag.setAttribute("cy", cy)
    tag.setAttribute("r", r)
    tag.setAttribute("stroke", stroke)
    tag.setAttribute("stroke-width", strokeWidth)
    tag.setAttribute("fill", fill)
    return tag;
}

var easy_circle = (x, y, r, fill) => {
    return circle(x, y, r, fill, 0, fill)
}

var getAttribute = (tag, attr) => {
    return tag.getAttribute(attr)
}

var render = (element, table) => {
    element = element();

    // Set the SVG value to empty so we can repopulate it with new variables
    element.innerHTML = '';

    for (let [key, value] of Object.entries(table)) {
        element.appendChild(value)
    }
    console.log(element)
    return element;
}

move = (element_id, x, y) => {
    tag = window.table[element_id]
    tag.setAttribute("cx", x)
    tag.setAttribute("cy", y)
}

var run = () => {
    var svg = document.getElementById('animation')
    svg.innerHTML = ''
    // window.table = {};
    // // circle("circle1", "50", "50", "40", "green", "4", "yellow");
    // window.table['circle1'] = easy_circle("50", "100", "40", "green");

    // render(svg, window.table)
    // setTimeout(() => move('circle1', 75, 250), 3000)
    console.log("WINDOW KEYS", window.keys)
    for(let [key, props] of Object.entries(window.made)) {
    	// var tag = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    	console.log(key, props);
    	var element = document.createElementNS("http://www.w3.org/2000/svg", props['struct']);
    	for(let [prop, value] of Object.entries(props['props'])) {
    		element.setAttribute(prop, value)
    	}
    	// element.setAttribute('fill', 'red')
    	svg.appendChild(element)
    }
}

var toggle = (element_id, inline) => {
    var x = document.getElementById(element_id);
    if (x.style.display === "none") {
        if (inline)
            x.style.display = "inline-block";
        else
            x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

var showCode = () => {
    // toggle("start", true);
    toggle("main", false)
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var addFields = (div_id) => {
    div = document.getElementById('makefields_' + div_id)
    field = document.getElementById('makecombo_' + div_id)

    console.log(div_id, div)
    div.innerHTML = ''

    window.structs[field.value].forEach(x => {
        div.appendChild(document.createTextNode(' '+x[0] + ' (' + x[1] + '): '))
        const textbox = document.createElement("input")
        textbox.setAttribute('class', 'property')
        textbox.setAttribute('property', x[0])
        textbox.setAttribute('type', x[1])
        div.appendChild(textbox)
    })
}

var delete_block = (div_id) => {
    div = document.getElementById(div_id)
    div.setAttribute('class', '')
    div.innerHTML = ''
}

var addMake = () => {
    const id = Object.keys(window.makes).length.toString()

    parentDiv = document.createElement('div')
    parentDiv.setAttribute('class', 'codeblock make')
    parentDiv.setAttribute('id', 'make_' + id)

    // Delete the node
    delete_node = document.createElement('a')
    delete_node.setAttribute('class', 'btn red')
    delete_node.appendChild(document.createTextNode('x'))
    delete_node.onclick = () => delete_block('make_' + id)
    parentDiv.appendChild(delete_node)

    parentDiv.appendChild(document.createElement('p').appendChild(document.createTextNode(" Make a ")))

    // Combobox containing all the available structs to make
    combobox = document.createElement('select')
    combobox.setAttribute('id', 'makecombo_' + id)
    combobox.setAttribute('class', 'struct')
    combobox.onchange = () => addFields(id)

    // For each element in the defined structs, add it as an option to the combobox
    for (let [x, _] of Object.entries(window.structs)) {
        option = document.createElement("option")
        option.appendChild(document.createTextNode(x))
        option.value = x
        combobox.appendChild(option)
    }

    parentDiv.appendChild(combobox)

    parentDiv.appendChild(document.createElement('p').appendChild(document.createTextNode(" named ")))

    make_name = document.createElement("input")
    make_name.setAttribute('id', id)
    make_name.setAttribute('class', 'make_name')
    parentDiv.appendChild(make_name)

    fields = document.createElement('div')
    fields.setAttribute('id', 'makefields_' + id)
    parentDiv.appendChild(fields)

    document.getElementById('blocks').appendChild(parentDiv);
    window.makes[id] = parentDiv

    addFields(id, combobox)

    console.log(document.getElementById('blocks'))
}

// Makes all the make commands
var make = () => {
	Array.prototype.forEach.call(document.getElementsByClassName('make'), function(el) {
        const id = el.getElementsByClassName('make_name')[0]
        const to_make = el.getElementsByClassName('struct')[0]
        var propsmap = {};
        const props = Array.from(el.getElementsByClassName('property')).forEach((x) => propsmap[x.getAttribute('property')] = x.value)
        console.log(el.getAttribute('id'), "MAKE A", to_make.value, "NAMED", id.value, "PROPERTIES:", propsmap);
        window.made[id.value] = {
        	'struct': to_make.value,
        	'props': propsmap
        }
    });
}

var ready = () => {
    window.structs = {
        'circle': [['cx', 'number'], ['cy', 'number'], ['r', 'number'], ['fill', 'color']],
        'rect': [['x', 'number'], ['y', 'number'], ['width', 'number'], ['height', 'number'], ['fill', 'color']]
    }
    window.makes = {}
    window.made = {}
    showCode()
}

ready()