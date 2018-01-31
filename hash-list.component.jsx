
class HashList extends React.Component {
    render() {
        //for(let i=0; i<this.props.hashTable.count; ){
            return (<HashItem hashItem = {this.props.hashTable.retrieve('Anton')}/>);
        //};
    }
}