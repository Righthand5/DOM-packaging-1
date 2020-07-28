window.dom = {
    create(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();//去掉字符串两边的空格
        return container.content.firstChild;
    },
    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling)
    },//如果他为最后一个节点
    before(node,node2){
        node.parentNode.insertBefore(node2,node)
    },
    append(parent,node){
        parent.appendChild(node)
    },
    wrap(node,parent){
        dom.before(node,parent)
        dom.append(parent,node)
    },
    //删
    remove(node){//用于删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){//用于删除后代
        //node.innerHTML = ''
        //const {childNodes} = node//直接从node获取它的childeNodes
        // for(let i = 0;i<childNodes.length;i++){//childeNodes元素删掉他的length会实时的变化
        //     dom.remove(childNodes[i])
        //     array.push(childNodes[i])
        // }
        // return array
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node,name,value){//重载
        if(arguments.length === 3){
        node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
    },
    text(node,string){//适配-用于读取文本内容
        if(arguments.length === 2){    
            if('innerText' in node){
                node.innerText = string
            }else{
                node.textContent = string
            }
        }else if(arguments.length===1){   
            if('innerText' in node){
                return node.innerText 
            }else{
                return node.textContent 
            }
        }
    },
    html(node,string){//用于读取HTML内容
        if(arguments.length===2){
            node.innerHTML = string
        }else if(arguments.length===1){
            return node.innerHTML
        }
    },
    style(node,name,value){//用于修改style
        if(arguments.length === 3){
            node.style[name] = value
        }else if(arguments.length ===2){
            if(typeof name === 'string'){
                return node.style[name]
            }else if(name instanceof Object){
                const object= name
                for(let key in object){
                    node.style[key] = object[key]
                }    
            }
        }
    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
           return node.classList.contains(className)
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    next(node){
        let x  = node.nextSibling//x=node的下一个节点
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x  = node.previousSibling//x=node的下一个节点
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x  
    },
    each(nodeList,fn){
        for(let i = 0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){//排行老几
        const list = dom.children(node.parentNode)
        let i
        for(i = 0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
};
