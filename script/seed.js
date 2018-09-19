'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  Review,
  Category,
  OrderProduct
} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
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
  const living = await Category.create({
    name: 'Living',
    image: '/images/living-thumbnail.jpg',
    kind: 'room'
  })
  const kitchen = await Category.create({
    name: 'Kitchen',
    image: '/images/kitchen-thumbnail.jpg',
    kind: 'room'
  })
  const bedroom = await Category.create({
    name: 'Bedroom',
    image: '/images/bedroom-thumbnail.jpg',
    kind: 'room'
  })
  const office = await Category.create({
    name: 'Office',
    image: '/images/office-thumbnail.jpg',
    kind: 'room'
  })
  const outdoors = await Category.create({
    name: 'Outdoor',
    image: '/images/outdoors-thumbnail.jpg',
    kind: 'room'
  })
  const bathroom = await Category.create({
    name: 'Bathroom',
    image: '/images/bathroom-thumbnail.jpg',
    kind: 'room'
  })
  const surfaces = await Category.create({
    name: 'Surfaces',
    image: '/images/no-image.png',
    kind: 'product'
  })
  const comfort = await Category.create({
    name: 'Comfort',
    image: '/images/no-image.png',
    kind: 'product'
  })
  const plumbing = await Category.create({
    name: 'Plumbing',
    image: '/images/no-image.png',
    kind: 'product'
  })
  const decorative = await Category.create({
    name: 'Decorative',
    image: '/images/no-image.png',
    kind: 'product'
  })

  // Seeding products
  const tolkensink = await Product.create({
    name: 'TOLKEN Sink Cabinet',
    price: 52900,
    image: 'https://www.ikea.com/us/en/images/products/godmorgon-tolken-kattevik-sink-cabinet-with-top-sink-white__0558048_PE661182_S4.JPG',
    description: `Plain elegance with a matte finish that hides fingerprints and water marks. Spacious and soft-closing, solid wood drawers. Built to last through years of spills and steamy showers.`
  })
  tolkensink.addCategory(bathroom)

  const lillacabinet = await Product.create({
    name: 'LILLANGEN Mirror Cabinet',
    price: 9900,
    image: 'https://www.ikea.com/us/en/images/products/lillangen-mirror-cabinet-door-end-units-brown__0489059_PE623432_S4.JPG',
    description: `The open shelves are perfect for perfume bottles or other things that you use frequently. Different wall materials require different types of fasteners. Use fasteners suitable for the walls in your home.`
  })
  lillacabinet.addCategory(bathroom)

  const folcurtain = await Product.create({
    name: 'FOLJAREN Shower Curtain',
    price: 1500,
    image: 'https://www.ikea.com/us/en/images/products/foljaren-shower-curtain-white__0597532_PE677170_S4.JPG',
    description: `Densely-woven polyester fabric with water-repellent coating. To be completed with shower curtain rings and a shower curtain rod.`
  })
  folcurtain.addCategory(bathroom)
  folcurtain.addCategory(decorative)

  const vadisland = await Product.create({
    name: 'VADHOLMA Island Kitchen',
    price: 54800,
    image: 'https://www.ikea.com/us/en/images/products/vadholma-kitchen-island-with-rack-black__0605057_PE681596_S4.JPG',
    description: `Gather around the kitchen island! VADHOLMA is the home’s given meeting point and perfect when you cook together. Plenty of island and rack storage ‒ and the butcher block gives you a robust workspace.`
  })
  vadisland.addCategory(kitchen)

  const docktable = await Product.create({
    name: 'DOCKSTA Table',
    price: 17900,
    image: 'https://www.ikea.com/us/en/images/products/docksta-table-white__35716_PE126584_S4.jpg',
    description: `A round table with soft edges gives a relaxed impression in a room. For increased stability, re-tighten the screws about two weeks after assembly and when necessary.`
  })
  docktable.addCategory(kitchen)

  const vangtable = await Product.create({
    name: 'VANGSTA Table',
    price: 9900,
    image: 'https://www.ikea.com/us/en/images/products/vangsta-extendable-table-white__0517427_PE640682_S4.JPG',
    description: `The melamine table top is moisture resistant, stain resistant and easy to keep clean. Extendable dining table with 1 extra leaf seats 4-6; makes it possible to adjust the table size according to need.`
  })
  vangtable.addCategory(kitchen)

  const stenshelf = await Product.create({
    name: 'STENSTORP Plate Shelf',
    price: 7000,
    image: 'https://www.ikea.com/us/en/images/products/stenstorp-plate-shelf-white__0137983_PE296876_S4.JPG',
    description: `The wall shelf makes it easy for you to see and reach the things you use every day. Different wall materials require different types of fasteners. Use fasteners suitable for the walls in your home.`
  })
  stenshelf.addCategory(kitchen)

  const sjallandchair = await Product.create({
    name: 'SJÄLLAND Chair',
    price: 9500,
    image: 'https://www.ikea.com/us/en/images/products/sjalland-reclining-chair-outdoor__0580857_PE670221_S4.JPG',
    description: `The eucalyptus slats have grain variations and natural color shifts that give the furniture a warm and natural look. The back of the chair can be adjusted to six different positions.`
  })
  sjallandchair.addCategory(outdoors)

  const klasengrill = await Product.create({
    name: 'KLASEN Charcoal Grill',
    price: 11900,
    image: 'https://www.ikea.com/us/en/images/products/klasen-charcoal-grill__0187921_PE340879_S4.JPG',
    description: `The built-in thermometer on the hood helps you check the temperature during grilling – without having to lift the hood. To get the desired grill temperature you can regulate the air flow by adjusting the stainless steel vent on the hood and on the front of the grill. The bottom shelf is made of stainless steel, so you can also use it as a durable utility surface to put hot barbecue accessories.`
  })
  klasengrill.addCategory(outdoors)

  const umbrella = await Product.create({
    name: 'LJUSTERO Umbrella',
    price: 13800,
    image: 'https://www.ikea.com/us/en/images/products/ljustero-umbrella-with-base-beige__0399620_PE565934_S4.JPG',
    description: `The fabric gives excellent protection against the sun’s UV rays as it has a UPF (Ultraviolet Protection Factor) rating of 50+, which means it blocks 98% of the ultraviolet radiation. The air vent reduces wind pressure and allows heat to circulate.`
  })
  umbrella.addCategory(outdoors)

  const appsofa = await Product.create({
    name: 'APPLARO Outdoor Sofa',
    price: 49000,
    image: 'https://www.ikea.com/us/en/images/products/applaro-sofa-outdoor-beige__0257323_PE401347_S4.JPG',
    description: ``
  })
  appsofa.addCategory(outdoors)

  const fredhammock = await Product.create({
    name: 'FREDON Hammock',
    price: 4000,
    image: 'https://www.ikea.com/us/en/images/products/fredon-hammock-beige__0334054_PE523261_S4.JPG',
    description: `The hammock gently rocks you into a state of harmony and relaxation. Whether mounted between two trees or using GÅRÖ hammock stand you can hang loose until it’s time for your next chore.`
  })
  fredhammock.addCategory(outdoors)
  fredhammock.addCategory(comfort)

  const hemdesk = await Product.create({
    name: 'HEMNES Desk',
    price: 44900,
    image: 'https://www.ikea.com/us/en/images/products/hemnes-desk-with-add-on-unit__0199570_PE356637_S4.JPG',
    description: `Solid wood is a durable natural material. You can mount the drawers to the right or left, according to your needs. The small compartment in the top drawer can be used for practical storage of pens and other small objects. You can collect cables and extension cords on the shelf under the table top, so they’re hidden but still close at hand.`
  })
  hemdesk.addCategory(office)
  hemdesk.addCategory(surfaces)

  const galdrawer = await Product.create({
    name: 'GALANT Drawer',
    price: 16900,
    image: 'https://www.ikea.com/us/en/images/products/galant-drawer-unit-on-casters-white__0132688_PE287550_S4.JPG',
    description: `This storage unit has been tested for office use and meets the requirements for safety, durability and stability. You can easily wheel the storage unit on casters under a table to save space.`
  })
  galdrawer.addCategory(office)

  const hattchair = await Product.create({
    name: 'HATTEFJALL Swivel Chair',
    price: 21900,
    image: 'https://www.ikea.com/us/en/images/products/hattefjall-swivel-chair__0564863_PE664309_S4.JPG',
    description: `The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at. Also, there’s a tilt- and height-adjusting mechanism that’s built to outlast years of ups and downs. The safety casters have a pressure-sensitive brake mechanism that keeps the chair in place when you stand up, and releases automatically when you sit down.`
  })
  hattchair.addCategory(office)

  const hektarlamp = await Product.create({
    name: 'HEKTAR Worklamp',
    price: 4900,
    image: 'https://www.ikea.com/us/en/images/products/hektar-work-lamp-with-wireless-charging-white__0473189_PE614491_S4.JPG',
    description: `he simple, oversized metal shape is inspired by old lamps from places like factories and theaters. Used together, HEKTAR lamps support different activities and create a unified, rustic look in the room.`
  })
  hektarlamp.addCategory(office)

  const billybook = await Product.create({
    name: 'BILLY Bookcase',
    price: 24700,
    image: 'https://www.ikea.com/us/en/images/products/billy-morliden-bookcase-white__0644498_PE702734_S4.JPG',
    description: `It is estimated that every five seconds, one BILLY bookcase is sold somewhere in the world. Pretty impressive considering we launched BILLY in 1979. It’s the booklovers choice that never goes out of style. Narrow shelves help you use small wall spaces effectively by accommodating small items in a minimum of space.`
  })
  billybook.addCategory(living)
  billybook.addCategory(surfaces)

  const dagsofa = await Product.create({
    name: 'DAGSTORP Sofa',
    price: 59900,
    image: 'https://www.ikea.com/us/en/images/products/dagstorp-sofa-white__0343332_PE535682_S4.JPG',
    description: `Seat cushions filled with high resilience foam and polyester fiber wadding provides great seating comfort. The armrests with extra padding are comfortable to lean against.`
  })
  dagsofa.addCategory(living)
  dagsofa.addCategory(comfort)

  const landarmchair = await Product.create({
    name: 'LANDSKRONA Armchair',
    price: 29900,
    image: 'https://www.ikea.com/us/en/images/products/landskrona-armchair__0602091_PE680160_S4.JPG',
    description: `The fabric cover has a warm and welcoming look, while the tight fit gives the armchair a neat and stylish expression. Seat cushions filled with high resilience foam and polyester fiber wadding provides great seating comfort.`
  })
  landarmchair.addCategory(living)
  landarmchair.addCategory(comfort)

  const ranlamp = await Product.create({
    name: 'RANARP Lamp',
    price: 5000,
    image: 'https://www.ikea.com/us/en/images/products/ranarp-floor-reading-lamp-with-led-bulb-white__0210371_PE363792_S4.JPG',
    description: `RANARP lamps are reminiscent of the past, crafted with details like the steel joints and striped textile cord. The floor and work lamps are heavy and very stable, yet fully adjustable.`
  })
  ranlamp.addCategory(living)
  ranlamp.addCategory(surfaces)

  const malmdesk = await Product.create({
    name: 'MALM Desk',
    price: 17900,
    image:
      'https://www.ikea.com/us/en/images/products/malm-desk-brown__0133380_PE288797_S4.JPG',
    description: `A clean design that’s just as beautiful on all sides – place it free-standing in the room or against a wall with cables neatly hidden inside. Use with other MALM products in the series for a unified look.`
  })
  malmdesk.addCategory(office)
  malmdesk.addCategory(surfaces)

  const martinchair = await Product.create({
    name: 'MARTIN Chair',
    price: 1900,
    image:
      'https://www.ikea.com/us/en/images/products/martin-chair-black__0518606_PE641097_S4.JPG',
    description: `You can stack the chairs, so they take less space when you're not using them.
    The self-adjusting plastic feet adds stability to the chair.`
  })
  martinchair.addCategory(comfort)
  martinchair.addCategory(office)

  const teochair = await Product.create({
    name: 'TEODORES Chair',
    price: 2500,
    image:
      'https://www.ikea.com/us/en/images/products/teodores-chair-white__0517051_PE640574_S4.JPG',
    description: `The chair is easy to store when not in use, since you can stack up to 6 chairs on top of each other. May be completed with FIXA self-adhesive floor protectors to protect the underlying surface against wear.`,
    quantity: 3
  })
  teochair.addCategory(comfort)
  teochair.addCategory(office)

  const neidenbed = await Product.create({
    name: 'NEIDEN Bed',
    price: 30000,
    image:
      'https://www.ikea.com/us/en/images/products/neiden-bed-frame__0566814_PE664782_S4.JPG',
    description: `The natural solid wood is beautiful as it is or you can make it more personal by staining, painting or waxing it. Also, the bed frame is high enough so you can place storage boxes underneath.`,
    quantity: 1
  })
  neidenbed.addCategory(comfort)
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
      isActive: false,
      orderStatus: 'shipped',
      userId: 1
    }),
    Order.create({
      isActive: false,
      orderStatus: 'processing',
      userId: 2
    })
  ])

  const orderproducts = await Promise.all([
    OrderProduct.create({
      orderId: 1,
      productId: 10,
      userId: 1,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 12,
      userId: 1,
      quantity: 2
    }),
    OrderProduct.create({
      orderId: 1,
      productId: 3,
      userId: 1,
      quantity: 1
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 4,
      userId: 2,
      quantity: 5
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 7,
      userId: 2,
      quantity: 3
    }),
    OrderProduct.create({
      orderId: 2,
      productId: 23,
      userId: 2,
      quantity: 3
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
