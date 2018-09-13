'use strict'

const db = require('../server/db')
const {User, Product, Order, Review, Category, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // Seeding Users
  const users = await Promise.all([
    User.create({
      firstName: 'Stella',
      lastName: 'Yun',
      email: 'stella@email.com',
      password: '1234',
      salt: 'salt',
      billingAddress: '245 E 19th street',
      shippingAddress: '245 E 19th street',
      userType: 'admin'
    }),
    User.create({
      firstName: 'Jan',
      lastName: 'Chen',
      email: 'jan@email.com',
      password: '5678',
      salt: 'sugar',
      billingAddress: '19 W 25th street',
      shippingAddress: '19 W 25th street',
      userType: 'guest'
    }),
    User.create({
      firstName: 'Funmi',
      lastName: 'Ojo',
      email: 'funmi@email.com',
      password: '0011',
      salt: 'pepper',
      billingAddress: '7 E 89st street',
      shippingAddress: '7 E 89st street',
      userType: 'user'
    })
  ])

  // Seeding Categories
  const desk = await Category.create({
    name: 'Desk',
    image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1122142-200.png'
  })
  const chair = await Category.create({
    name: 'Chair',
    image: 'https://static.thenounproject.com/png/197050-200.png'
  })
  const bed = await Category.create({
    name: 'Bed',
    image: 'https://static.thenounproject.com/png/50448-200.png'
  })
  const bedroom = await Category.create({
    name: 'Bed room',
    image: 'bedroom.jpg'
  })
  const studyroom = await Category.create({
    name: 'Study room',
    image: 'study.jpg'
  })

  // Seeding products
  const malmdesk = await Product.create({
    name: 'MALM Desk',
    price: 17900,
    image: 'https://www.ikea.com/us/en/images/products/malm-desk-brown__0133380_PE288797_S4.JPG',
    description: `A clean design that’s just as beautiful on all sides – place it free-standing in the room or against a wall with cables neatly hidden inside. Use with other MALM products in the series for a unified look.`,
    quantity: 10
  })
  malmdesk.addCategory(desk)
  malmdesk.addCategory(studyroom)

  const martinchair = await Product.create({
    name: 'MARTIN Chair',
    price: 1900,
    image: 'https://www.ikea.com/us/en/images/products/martin-chair-black__0518606_PE641097_S4.JPG',
    description: `You can stack the chairs, so they take less space when you're not using them.
    The self-adjusting plastic feet adds stability to the chair.`,
    quantity: 5
  })
  martinchair.addCategory(chair)
  martinchair.addCategory(studyroom)

  const teochair = await Product.create({
    name: 'TEODORES Chair',
    price: 2500,
    image: 'https://www.ikea.com/us/en/images/products/teodores-chair-white__0517051_PE640574_S4.JPG',
    description: `The chair is easy to store when not in use, since you can stack up to 6 chairs on top of each other. May be completed with FIXA self-adhesive floor protectors to protect the underlying surface against wear.`,
    quantity: 3
  })
  teochair.addCategory(chair)
  teochair.addCategory(studyroom)

  const neidenbed = await Product.create({
    name: 'NEIDEN Bed',
    price: 30000,
    image: 'https://www.ikea.com/us/en/images/products/neiden-bed-frame__0566814_PE664782_S4.JPG',
    description: `The natural solid wood is beautiful as it is or you can make it more personal by staining, painting or waxing it. Also, the bed frame is high enough so you can place storage boxes underneath.`,
    quantity: 1
  })
  neidenbed.addCategory(bed)
  neidenbed.addCategory(bedroom)

  // Seeding Reviews
  const reviews = await Promise.all([
    Review.create({
      rating: 3,
      comment: `I was looking for a simple chair to use with my dining table. I took a liking to this chair over regular foldable chairs because they were simple and stylish. They were easy to put together, but I was disappointed that they do not stack as easily as they should. I am still debating whether or not to keep them.`,
      productId: 2,
      userId: 2
    }),
    Review.create({
      rating: 2,
      comment: `Desk with no wiring holes for Computer!?! Nice desk with wire management but no holes to run wires to the storage area!?! Seriously?`,
      productId: 1,
      userId: 1
    }),
    Review.create({
      rating: 4,
      comment: `After a month having this desk, I'm extremely happy with it. The only reason I can't give it a 5-star review is because the cabinet has no hole in the back for cords, which I knew prior to buying the desk. The good news is that the wood was soft enough to manually drill a hole for cords.`,
      productId: 1,
      userId: 3
    }),
    Review.create({
      rating: 5,
      comment: `I bought this while it was on sale at Ikea and it took about 3 hours to put together although this was my very first purchase from Ikea. It looks very nice and modern and it seems pretty sturdy, I would recommend it.`,
      productId: 1,
      userId: 2
    }),
    Review.create({
      rating: 5,
      comment: `We bought 4 of these to go with the BJÖRKSNÄS table. I was a bit worried about a utilitarian look, but, for the price, we gave it a try. They look fantastic with the birch table. More importantly, they are sturdy and easy to clean. Our rambunctious boys have yet to tip them over. Even with the white, they are so easy to wipe clean because it is all smooth surfaces.`,
      productId: 3,
      userId: 2
    }),
    Review.create({
      rating: 3,
      comment: `I recently purchased four chairs and have no complaint in general; however, on two of the chairs one of the tabs were missing (only has 3 tabs on the bottom instead of 4) for securing it to the base. I have tried calling the customer service number several times a day for the last week to get two replacements but get the message that the switchboard is busy and to call back.`,
      productId: 3,
      userId: 3
    }),
    Review.create({
      rating: 1,
      comment: `The quality was not good. Not happy at all. If I didn't need at that time I would have returned it.`,
      productId: 4,
      userId: 1
    })
  ])

  const orders = await Promise.all([
    Order.create({
      isActive: true,
      orderStatus: 'shipped',
      userId: 1
    }),
    Order.create({
      isActive: true,
      orderStatus: 'processing',
      userId: 2
    })
  ])

  const orderproducts = await Promise.all([
    OrderProduct.create({
      orderId: 1,
      productId: 1,
      userId: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 2,
      userId: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 3,
      userId: 1
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 2,
      userId: 2
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 4,
      userId: 2
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
