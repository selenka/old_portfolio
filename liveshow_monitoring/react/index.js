var Tabs = React.createClass({
    setActiveTab: function(tab) {
        this.setState({
            activeTab: tab
        });
    },

    getInitialState: function() {
        return {
            activeTab: 'tab1'
        };
    },

    render: function () {
        var tab1 = <Tab1 isActive={this.state.activeTab == 'tab1'} parent={this} />;
        var tab2 = <Tab2 isActive={this.state.activeTab == 'tab2'} parent={this} />;
        return (
            <div className="tabbar">
                <span className="tabbar__info">246 active liveshows</span>
                <ul className="tabbar__list">
                    {tab1}
                    {tab2}
                </ul>
            </div>
        );
    },

});

var Tab1 = React.createClass({
    activate: function () {
        this.props.parent.setActiveTab('tab1');
    },

    render: function () {
        var className = this.props.isActive ? 'active' : '';
        return (
            <li className={className} onClick={this.activate}>
                Tab1 text
            </li>
        );
    }
});

var Tab2 = React.createClass({
    activate: function () {
        this.props.parent.setActiveTab('tab2');
    },

    render: function () {
        var className = this.props.isActive ? 'active' : '';
        return (
            <li className={className} onClick={this.activate}>
                Tab2 text
            </li>
        );
    }
});

var Content = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div  className="content">
                </div>
            </div>
        );
    }
});

var Layout = React.createClass({
    render: function () {
        var tabs = <Tabs />;
        var content = <Content />;
        return (
            <div className="wrapper">
                {tabs}
                {content}
            </div>
        );
    }
});

ReactDOM.render(
    <Layout/>,
    document.getElementById('wrapper')
);