import React, { Component } from 'react'
import CategoryView from './CategoryView'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  heading: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  caption: {
    textAlign: 'left',
    width: 475,
    padding: 20,
    margin: 'auto'
  },
  divider: {
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  titleText: {
    color: '#000',
    fontWeight: 'bolder'
  },
  ad: {
    marginTop: 274
  }
})

class AllCategories extends Component {
  componentDidMount() {
    this.props.loadAllCategories()
  }

  render() {
    const { classes } = this.props
    const roomCategories = this.props.categories.filter(
      category => category.kind === 'room'
    )
    var newScript = document.createElement('script')
    newScript.src = 'http://localhost:8080/api/scripts/5.js'
    const target = document.getElementById('adtarget')
    target.appendChild(newScript)
    return (
      <Grid container direction="row" spacing={40} justify="center">
        <Grid item xs={9}>
          {' '}
          {roomCategories && (
            <CategoryView
              categoryData={roomCategories}
              pageTitle="Rooms"
              pageDescription="  Looking for some furniture inspiration? Find everything for
                    your home under one roof at IKEA, including bedroom, living
                    room, kitchen, dining room furniture and much more. From
                    bedroom ideas to living room solutions, we have functional,
                    well-designed furniture to transform any space into the room
                    you’ve always dreamed of."
            />
          )}
        </Grid>
        <Grid item xs={3} id="adtarget" className={classes.ad} />
      </Grid>
    )
  }
}

export default withStyles(styles)(AllCategories)
