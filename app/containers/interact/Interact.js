import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import DocumentTitle from 'react-document-title';

export default class Interact extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        //this.state = {
        //    current:this.props.categories[0]
        //}
    }
    /*
    handleClick = (e) => {
        console.log('click ', e);
        if(e === '首页'){
            this.props.getArticleList('');
        }else{
            this.props.getArticleList(e);
        }
        let toPath = e === '首页'?'/':'/'+e;
        this.setState({
            current: e,
        });
        this.props.history.push(toPath);
    };
    */
    render(){
        let _this = this;
        let webTitle = "Nitrohe's Blog";
        
        return(
            <DocumentTitle title={`${webTitle} | 互动`}>
                <div className={style.timeline}>


                </div>
            </DocumentTitle>

        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
