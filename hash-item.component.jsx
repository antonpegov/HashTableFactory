class HashItem extends React.Component {
    render() {
        return(
            <div>
               {JSON.stringify(this.props.hashItem)}
            </div>
        )
    }
}