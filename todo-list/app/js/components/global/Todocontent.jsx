import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Todocontent extends Component {

  constructor() {
      super();
    
      this.state = {
         todos: 
         [
            {
               id:1,
               desc: 'Finish the project setup',
               isCompleted:true
            },
        
            {
               id:2,
               desc: 'Implementating the project',
               isCompleted:false
            },
        
            {
               id:3,
               desc: 'Test the project',
               isCompleted:false
            },

            {
               id:4,
               isNew:true
            }
         ],

         tempData:[], //used for hold all todo's while doing search operation

         focusIdx:-1 //default -1 
      }

      this.onSearch=this.onSearch.bind(this);

   }

  toggleTask(idx, e){
    if(idx!=undefined){
      const todos = [...this.state.todos];
      todos[idx].isCompleted = !todos[idx].isCompleted;
      console.log(todos);
      this.setState({ todos,});
    }
  }

  onChange(idx, e){
    if(idx!=undefined){
      const todos = [...this.state.todos];
      if(todos[idx].isNew && e.target.value){
        todos[idx].isNew=false;
        todos.push({id:todos[todos.length-1].id+1, isNew:true});
      }
      todos[idx].desc=e.target.value;
      this.setState({ todos });
    }
  }

  onFocus(idx, e){
    if(idx!=undefined){
      let focusIdx=[this.state.focusIdx];
      focusIdx=idx;
      this.setState({focusIdx});
    }
  }


  onSearch(e){
    
    let query=e.target.value;
    if(this.state.tempData.length==0){
      let tempData=[...this.state.todos];
      this.setState({tempData}, ()=>{
          this.filterTodosAfterTempDataLoaded(query);
      });
    }
    else{
      this.filterTodosAfterTempDataLoaded(query);
    }
      
  }

  filterTodosAfterTempDataLoaded(query){

    let todos=[];
    if(query){
      this.state.tempData.map((todo, idx) =>{
        if(todo.desc && todo.desc.toLowerCase().includes(query.toLowerCase())){
          todos.push(todo);
        }
      });
      this.setState({todos});
    }
    else if(this.state.tempData.length>0){
      this.setState({todos:this.state.tempData});
      this.setState({tempData:[]});
    }

  }

  render() {
    return (
      <div className='todo-container'>
        <div className='action-bar'>

          <div className='action-item'>
            <input type="text" onKeyUp={this.onSearch} placeholder="Search"/>
          </div>
          <div className='action-item'>
             <i className="material-icons">search</i>
          </div>
          
        </div>

        {/*<button className="fab" onClick={}><i className="material-icons">add</i></button>*/}

        
        <section>
          <div className="todo-list">
             {this.state.todos.map( (todo, idx) =>( 
              <TodoListItem key={todo.id} id={todo.id} isNew={todo.isNew} desc={todo.desc}
                 isCompleted={todo.isCompleted} isFocus={this.state.focusIdx == idx}
                 onTaskComplete={e => this.toggleTask(idx,e)} onBlur={e => this.onFocus(-1, e)} onFocus={e => this.onFocus(idx, e)} onChange={e => this.onChange(idx, e)} />
             ))}


             
           <div className={"no-todos text-center "+ (this.state.todos.length==0?'':'hide')}>
              <i className="material-icons">search</i>
              <h1>Oops! No todo found</h1>
              <small>Change search keyword and try again</small>
           </div>
             

          </div>
        </section>

      </div>
    );
  }
}


const TodoListItem = props => {

  if(props.isNew){
    return (
     <div className={"todo-item "+ (props.isFocus?'active':'')}>
          <span className="left-icon">
            <i className="material-icons">add</i>
          </span>
          <div className="editor">
            <ContentEditable html={props.desc} onFocusOut={props.onBlur} onFocus={props.onFocus} onChange={props.onChange} />
          </div>
     </div>)
  }

  return (<div className={"todo-item "+ (props.isCompleted?'done ':'')+ (props.isFocus?'active':'')}>
            <input type="checkbox" id={`${props.id}`} checked={props.isCompleted} onChange={props.onTaskComplete} />
             <div className="editor">
               <ContentEditable html={props.desc} onFocusOut={props.onBlur} onFocus={props.onFocus} onChange={props.onChange} />
             </div>
          </div>)

}


class ContentEditable extends Component {

    constructor(props) {
      super(props);
      this.emitChange = this.emitChange.bind(this);
    };

    render(){
       return (<span 
            onInput={ e => this.emitChange(e, false)} 
            onBlur={ e => this.emitChange(e, true)} 
            contentEditable="true"
            placeholder="List Item"
            onFocus={this.props.onFocus}
            dangerouslySetInnerHTML={{__html: this.props.html}}></span>);
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
    }

    emitChange(e, isBlur){

        if(isBlur && this.props.onFocusOut)
          this.props.onFocusOut();

        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
};


  


