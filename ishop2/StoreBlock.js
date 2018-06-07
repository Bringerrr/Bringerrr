var StoreBlock = React.createClass({

  displayName: 'StoreBlock',

  // propTypes: {
  //   item:React.PropTypes.string.isRequired,

  // },

  getDefaultProps: function() {
    return { title: "Заголовок" }
  },

  render: function() {

    var header = this.props.item;

    var itemHeader = React.DOM.div({key:header.code,className:'HeaderItems'},
        React.DOM.span({className:'HeaderText'},header.text),
        React.DOM.span({className:'HeaderUrl'},header.url),
        React.DOM.span({className:'HeaderPrice'},header.price),
        React.DOM.span({className:'HeaderCount'},header.count)
  )

    var itemsCode=[];

    this.props.items.forEach(a => {
      var item=a;
      var itemCode=        
        React.DOM.div({key:item.code,className:'item'},
          React.DOM.span({className:'Text'},item.text),
          React.DOM.span({className:'Url'},React.DOM.a({className:'UrlSrc',href:item.url},item.url)),
          React.DOM.span({className:'Price'},item.price),
          React.DOM.span({className:'Count'},item.count)
        );
      itemsCode.push(itemCode);
    });
    
    return React.DOM.div( {className:'StoreBlock'}, 
      React.DOM.div( {className:'Question'}, this.props.title ),
      React.DOM.div( {className:'Header'}, itemHeader ),
      React.DOM.div( {className:'items'}, itemsCode ),
    );
  },

});