import React, {Component} from 'react'
import {Menu, Icon, Card} from 'antd'
import style from './style.css'


const menus = [
    {url: '/', name: '首页', iconType: 'home'},
    /*{url: '/newArticle', name: '写文章', iconType: 'edit'},*/
    {url: '/manageUser', name: '用户管理', iconType: 'usergroup-delete'},
    {url: '/manageArticle', name: '文章管理', iconType: 'file-markdown'},
    {url: '/manageComment', name: '评论管理', iconType: 'message'},
    {url: '/manageFriendlink', name: '友链管理', iconType: 'share-alt'},
    {url: '/manageTimeline', name: '时间线管理', iconType: 'schedule'},


];
export default class AdminMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('menu-----------render------');
        return (
            <div>

                <div className={style.menuLogo}>
                    <Card bodyStyle={{ padding: '20px' }}>
                       <img className={style.menuLogoImg} style={{width:106,height:30}} title="Nitrohe的管理后台" src={`/logo_black.png`} />

                     </Card>
                </div>
                <div className={style.menuItem}>
                    <Menu
                        selectedKeys={[this.props.url]}
                        mode="inline"
                        defaultSelectedKeys={['/']}
                        onClick={({key}) => {
                            this.props.changeUrl(key);
                            this.props.history.push(`/admin.html${key}`)
                        }}>
                        {
                            menus.map((item, index) =>
                                <Menu.Item key={item.url}  style={{ fontSize: '14px' }}>
                                    <Icon type={item.iconType}/>
                                    <span>{item.name}</span>
                                </Menu.Item>)
                        }

                    </Menu>
                </div>
            </div>
        )
    }

}
