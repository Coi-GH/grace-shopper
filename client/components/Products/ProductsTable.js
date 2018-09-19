import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AddCircleIcon from '@material-ui/icons/AddCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    textAlign: 'center'
  },
  bar: {
    backgroundColor: 'white',
    boxShadow: 'none',
    marginBottom: 20
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  table: {
    minWidth: 700
  },
  productImage: {
    maxWidth: 100
  },
  tableCells: {
    textAlign: 'center'
  },
  descriptionCell: {
    textAlign: 'left'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  list: {
    fontWeight: 'bold'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

const ProductsTable = props => {
  const { classes } = props
  const products = props.productData
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static" color="default">
        <Toolbar>
          <Button
            width={200}
            className={classes.buttons}
            component={Link}
            to="/manageproducts/products/add"
          >
            <AddCircleIcon className={classes.leftIcon} />
            Add product
          </Button>
        </Toolbar>
      </AppBar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableRows}>
            <TableCell className={classes.tableCells}>Product Image</TableCell>
            <TableCell className={classes.tableCells} numeric>
              Category
            </TableCell>
            <TableCell className={classes.tableCells} numeric>
              Name
            </TableCell>
            <TableCell className={classes.tableCells} numeric>
              Price
            </TableCell>
            <TableCell className={classes.tableCells} numeric>
              Description
            </TableCell>
            <TableCell className={classes.tableCells} numeric>
              Quantity
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => {
            return (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  <img className={classes.productImage} src={product.image} />
                </TableCell>
                <TableCell className={classes.tableCells} numeric>
                  {product.categories && (
                    <ul className={classes.list}>
                      {product.categories.map(
                        category =>
                          category.kind === 'room' ? (
                            <li key={category.id}>
                              <Link to={`/rooms/${category.id}`}>
                                {category.name}
                              </Link>
                            </li>
                          ) : (
                            <li key={category.id}>
                              <Link to={`/product/${category.id}`}>
                                {category.name}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </TableCell>
                <TableCell className={classes.tableCells} numeric>
                  {product.name}
                </TableCell>
                <TableCell className={classes.tableCells} numeric>
                  ${product.price}
                </TableCell>
                <TableCell className={classes.descriptionCell} numeric>
                  {product.description}
                </TableCell>
                <TableCell className={classes.tableCells} numeric>
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to={{
                      pathname: `/manageproducts/edit/product/${product.id}`,
                      state: { product: product }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default withStyles(styles)(ProductsTable)
