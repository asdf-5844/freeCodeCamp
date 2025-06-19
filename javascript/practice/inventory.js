const inventory = [];

function findProductIndex(name) {
  const lowerName = name.toLowerCase();
  for (let i = 0; i < inventory.length; i++){
    if (inventory[i].name === lowerName) {
      return i;
    }
  }
  return -1;
}

function addProduct(product) {
  const name = product.name.toLowerCase();
  const index = findProductIndex(name);
  if (index >= 0) {
    inventory[index].quantity += product.quantity;
    console.log(`${name} quantity updated`);
  } else {
    inventory.push({ name: name, quantity: product.quantity });
    console.log(`${name} added to inventory`);
  }
}

function removeProduct(name, quantity) {
  const lowerName = name.toLowerCase();
  const index = findProductIndex(lowerName);

  if (index === -1) {
    console.log(`${lowerName} not found`);
    return;
  }

  const product = inventory[index];

  if (product.quantity < quantity) {
    console.log(`Not enough ${lowerName} available, remaining pieces: ${product.quantity}`);
  } else {
    product.quantity -= quantity;

    if (product.quantity === 0) {
      // Deletes the product at its index
      inventory.splice(index, 1);
    }

    if (product.quantity > 0) {
      console.log(`Remaining ${lowerName} pieces: ${product.quantity}`);
    }
  }
}
addProduct({name: "FLOUR", quantity: 5})
