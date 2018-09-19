import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ProductsTable from './ProductsTable'
import { fetchAllProducts } from '../../store/product'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    textAlign: 'center'
  }
})

class ManageProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: props.products
    }
  }

  render() {
    const { classes } = this.props
    const products = this.props.products
    return (
      <div>
        <ProductsTable productData={products} classes={classes} />
      </div>
    )

    // <div className={classes.root}>
    //   <Table className={classes.table}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>
    //           <Button
    //             width={200}
    //             className={classes.buttons}
    //             component={Link}
    //             to="/manageproducts/products/add"
    //           >
    //             Add product
    //           </Button>
    //         </TableCell>
    //       </TableRow>
    //       <TableRow className={classes.tableRows}>
    //         <TableCell className={classes.tableCells}>
    //           Product Image
    //         </TableCell>
    //         <TableCell className={classes.tableCells} numeric>
    //           Category
    //         </TableCell>
    //         <TableCell className={classes.tableCells} numeric>
    //           Name
    //         </TableCell>
    //         <TableCell className={classes.tableCells} numeric>
    //           Price
    //         </TableCell>
    //         <TableCell className={classes.tableCells} numeric>
    //           Description
    //         </TableCell>
    //         <TableCell className={classes.tableCells} numeric>
    //           Quantity
    //         </TableCell>
    //         <TableCell />
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {products.map(product => {
    //         return (
    //           <TableRow key={product.id}>
    //             <TableCell component="th" scope="row">
    //               <img className={classes.productImage} src={product.image} />
    //             </TableCell>
    //             <TableCell className={classes.tableCells} numeric>
    //               {product.categories && (
    //                 <ul>
    //                   {product.categories.map(category => (
    //                     <li key={category.id}>{category.name}</li>
    //                   ))}
    //                 </ul>
    //               )}
    //             </TableCell>
    //             <TableCell className={classes.tableCells} numeric>
    //               {product.name}
    //             </TableCell>
    //             <TableCell className={classes.tableCells} numeric>
    //               ${product.price}
    //             </TableCell>
    //             <TableCell className={classes.descriptionCell} numeric>
    //               {product.description}
    //             </TableCell>
    //             <TableCell className={classes.tableCells} numeric>
    //               {product.quantity}
    //             </TableCell>
    //             <TableCell>
    //               <Button
    //                 variant="contained"
    //                 component={Link}
    //                 to={{
    //                   pathname: `/manageproducts/edit/product/${product.id}`,
    //                   state: {
    //                     product: product
    //                   }
    //                 }}
    //               >
    //                 edit<EditIcon />
    //               </Button>
    //             </TableCell>
    //           </TableRow>
    //         )
    //       })}
    //     </TableBody>
    //   </Table>
    // </div>
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.allProducts,
    isLoading: state.product.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAllProducts: () => dispatch(fetchAllProducts())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ManageProducts)
)
