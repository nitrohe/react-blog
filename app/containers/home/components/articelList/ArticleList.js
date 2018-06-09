import React,{Component,PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {ArticleListCell} from "../articleListCell/ArticleListCell";
import QueueAnim from 'rc-queue-anim';

export default class ArticleList extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        return(
            <div>
                <QueueAnim type="bottom" >
                {
                    this.props.data.map((item,index)=>(
                        <ArticleListCell getArticleDetail={this.props.getArticleDetail} history={this.props.history} key={index} data={item}/>
                    ))
                }
                </QueueAnim>
            </div>
        )
    }
}