export const products = [
  // Juices
  { id: 1, nameUz: "Apelsin sharbati", nameEn: "Orange Juice", nameRu: "Апельсиновый сок", price: 15000, category: "juice", image: new URL('../assets/sharbat1.jpg', import.meta.url).href, description: "Tabiy apelsin sharbati" },
  { id: 3, nameUz: "Olma sharbati", nameEn: "Apple Juice", nameRu: "Яблочный сок", price: 13000, category: "juice", image: new URL('../assets/sharbat3.jpg', import.meta.url).href, description: "Toza olma sharbati" },
  { id: 4, nameUz: "Granat sharbati", nameEn: "Pomegranate Juice", nameRu: "Гранатовый сок", price: 18000, category: "juice", image: new URL('../assets/sharbat4.jpg', import.meta.url).href, description: "Premium granat sharbati" },
  { id: 5, nameUz: "Limon sharbati", nameEn: "Lemon Juice", nameRu: "Лимонный сок", price: 12000, category: "juice", image: new URL('../assets/sharbat5.jpg', import.meta.url).href, description: "Yangi limon sharbati" },
  { id: 6, nameUz: "Anor mix", nameEn: "Pomegranate Mix", nameRu: "Гранат микс", price: 19000, category: "juice", image: new URL('../assets/sharbat1.jpg', import.meta.url).href, description: "Mevali miksolgan sharbat" },
  { id: 8, nameUz: "Ananas sharbati", nameEn: "Pineapple Juice", nameRu: "Ананасовый сок", price: 17000, category: "juice", image: new URL('../assets/sharbat3.jpg', import.meta.url).href, description: "Yangi ananas sharbati" },
  { id: 9, nameUz: "Pomidor sharbati", nameEn: "Tomato Juice", nameRu: "Томатный сок", price: 13000, category: "juice", image: new URL('../assets/sharbat4.jpg', import.meta.url).href, description: "Sog'lom pomidor sharbati" },
  { id: 10, nameUz: "Qizil uzum", nameEn: "Red Grape Juice", nameRu: "Сок красного винограда", price: 16000, category: "juice", image: new URL('../assets/sharbat5.jpg', import.meta.url).href, description: "Shirin uzum sharbati" },

  // Smoothies
  { id: 11, nameUz: "Mango Smoothie", nameEn: "Mango Smoothie", nameRu: "Манго смузи", price: 22000, category: "smoothie", image: new URL('../assets/muzli1.jpg', import.meta.url).href, description: "Kremli mango smuzzi" },
  { id: 12, nameUz: "Qulupnay Smoothie", nameEn: "Strawberry Smoothie", nameRu: "Клубничный смузи", price: 21000, category: "smoothie", image: new URL('../assets/muzli2.jpg', import.meta.url).href, description: "Yangi qulupnay smuzzi" },
  { id: 13, nameUz: "Shaftalon Smoothie", nameEn: "Peach Smoothie", nameRu: "Персиковый смузи", price: 20000, category: "smoothie", image: new URL('../assets/muzli3.jpg', import.meta.url).href, description: "Yumshoq shaftalon smuzzi" },
  { id: 14, nameUz: "Blueberry Smoothie", nameEn: "Blueberry Smoothie", nameRu: "Черничный смузи", price: 23000, category: "smoothie", image: new URL('../assets/muzli4.jpg', import.meta.url).href, description: "Antioksidant blueberry smuzzi" },
  { id: 15, nameUz: "Avocado Smoothie", nameEn: "Avocado Smoothie", nameRu: "Авокадо смузи", price: 25000, category: "smoothie", image: new URL('../assets/muzli5.jpg', import.meta.url).href, description: "Kremli avocado aralashmasi" },
  { id: 16, nameUz: "Tropical Smoothie", nameEn: "Tropical Smoothie", nameRu: "Тропический смузи", price: 24000, category: "smoothie", image: new URL('../assets/muzli1.jpg', import.meta.url).href, description: "Tropik mevali smuzzi" },
  { id: 17, nameUz: "Green Smoothie", nameEn: "Green Smoothie", nameRu: "Зеленый смузи", price: 23000, category: "smoothie", image: new URL('../assets/muzli2.jpg', import.meta.url).href, description: "Sog'lom yashil smuzzi" },
  { id: 18, nameUz: "Banan Smoothie", nameEn: "Banana Smoothie", nameRu: "Банановый смузи", price: 19000, category: "smoothie", image: new URL('../assets/muzli3.jpg', import.meta.url).href, description: "Kremli banan smuzzi" },
  { id: 19, nameUz: "Mixed Berry Smoothie", nameEn: "Mixed Berry Smoothie", nameRu: "Ягодный микс смузи", price: 22000, category: "smoothie", image: new URL('../assets/muzli4.jpg', import.meta.url).href, description: "Barcha rezalar aralashmasi" },
  { id: 20, nameUz: "Shokolad Smoothie", nameEn: "Chocolate Smoothie", nameRu: "Шоколадный смузи", price: 21000, category: "smoothie", image: new URL('../assets/muzli5.jpg', import.meta.url).href, description: "Boy shokolad smuzzi" },

  // Energy Drinks
  { id: 21, nameUz: "Power Energiya", nameEn: "Power Energy", nameRu: "Пауэр Энергия", price: 25000, category: "energy", image: new URL('../assets/energetik1.jpg', import.meta.url).href, description: "Yuqori energiya kuchaytiruvchi" },
  { id: 22, nameUz: "Thunder Boost", nameEn: "Thunder Boost", nameRu: "Гром Буст", price: 26000, category: "energy", image: new URL('../assets/energetik2.jpg', import.meta.url).href, description: "Maksimal energiya ichimlig" },
  { id: 23, nameUz: "Vitality Plus", nameEn: "Vitality Plus", nameRu: "Виталити Плюс", price: 24000, category: "energy", image: new URL('../assets/energetik3.jpg', import.meta.url).href, description: "Doimiy energiya" },
  { id: 24, nameUz: "Surge Energiya", nameEn: "Surge Energy", nameRu: "Сёрж Энергия", price: 23000, category: "energy", image: new URL('../assets/energetik4.jpg', import.meta.url).href, description: "Tezkor energiya" },
  { id: 25, nameUz: "Bolt Lightning", nameEn: "Bolt Lightning", nameRu: "Молния Болт", price: 27000, category: "energy", image: new URL('../assets/energetik5.jpg', import.meta.url).href, description: "Ultra kuchli energiya" },
  { id: 26, nameUz: "Flame Rush", nameEn: "Flame Rush", nameRu: "Огненный Спешка", price: 25000, category: "energy", image: new URL('../assets/energetik1.jpg', import.meta.url).href, description: "Kuchli hamla" },
  { id: 27, nameUz: "Ice Storm", nameEn: "Ice Storm", nameRu: "Ледяной Шторм", price: 24000, category: "energy", image: new URL('../assets/energetik2.jpg', import.meta.url).href, description: "Sovuq energiya portlovi" },
  { id: 28, nameUz: "Nexus Energiya", nameEn: "Nexus Energy", nameRu: "Нексус Энергия", price: 26000, category: "energy", image: new URL('../assets/energetik3.jpg', import.meta.url).href, description: "Ilg'or energiya" },
  { id: 29, nameUz: "Velocity Drink", nameEn: "Velocity Drink", nameRu: "Скорость Напиток", price: 25000, category: "energy", image: new URL('../assets/energetik4.jpg', import.meta.url).href, description: "Tezkor energiya kuchaytirish" },
  { id: 30, nameUz: "Cosmic Force", nameEn: "Cosmic Force", nameRu: "Космическая Сила", price: 28000, category: "energy", image: new URL('../assets/energetik5.jpg', import.meta.url).href, description: "Super kuchli ichimlik" },

  // Sodas
  { id: 31, nameUz: "Kola Klassik", nameEn: "Cola Classic", nameRu: "Классическая Кола", price: 10000, category: "soda", image: new URL('../assets/gazli1.jpg', import.meta.url).href, description: "Klassik kola ta'mi" },
  { id: 32, nameUz: "Sprite Yangi", nameEn: "Sprite Fresh", nameRu: "Спрайт Свежий", price: 10000, category: "soda", image: new URL('../assets/gazli3.jpg', import.meta.url).href, description: "Limon-laym gazli ichimlik" },
  { id: 33, nameUz: "Apelsin Pop", nameEn: "Orange Pop", nameRu: "Апельсиновый Поп", price: 9000, category: "soda", image: new URL('../assets/gazli3.jpg', import.meta.url).href, description: "Mevali apelsin gazli ichimlik" },
  { id: 34, nameUz: "Uzum Fizz", nameEn: "Grape Fizz", nameRu: "Виноградный Шипучка", price: 9500, category: "soda", image: new URL('../assets/gazli5.jpg', import.meta.url).href, description: "Uzum ta'mli gazli ichimlik" },
  { id: 35, nameUz: "Cherry Blast", nameEn: "Cherry Blast", nameRu: "Вишневый Взрыв", price: 10500, category: "soda", image: new URL('../assets/gazli1.jpg', import.meta.url).href, description: "Gilos tagligi gazli ichimlik" },
  { id: 36, nameUz: "Limonad Yangi", nameEn: "Lemonade Fresh", nameRu: "Свежий Лимонад", price: 11000, category: "soda", image: new URL('../assets/gazli3.jpg', import.meta.url).href, description: "Yangi limonad gazli ichimlik" },
  { id: 37, nameUz: "Qulupnay Wave", nameEn: "Strawberry Wave", nameRu: "Клубничная Волна", price: 10500, category: "soda", image: new URL('../assets/gazli3.jpg', import.meta.url).href, description: "Qulupnay gazli ichimlik" },
  { id: 38, nameUz: "Tropik Portlovi", nameEn: "Tropical Burst", nameRu: "Тропический Взрыв", price: 11500, category: "soda", image: new URL('../assets/gazli5.jpg', import.meta.url).href, description: "Tropik miksolgan gazli ichimlik" },
  { id: 39, nameUz: "Imbirli Ale", nameEn: "Ginger Ale", nameRu: "Имбирный эль", price: 12000, category: "soda", image: new URL('../assets/gazli1.jpg', import.meta.url).href, description: "Achchiq imbirli gazli ichimlik" },
  { id: 40, nameUz: "Root Beer", nameEn: "Root Beer", nameRu: "Корневое пиво", price: 11000, category: "soda", image: new URL('../assets/gazli3.jpg', import.meta.url).href, description: "Klassik root beer gazli ichimlik" },

  // Tea & Coffee
  { id: 41, nameUz: "Qora Choy", nameEn: "Black Tea", nameRu: "Черный чай", price: 8000, category: "tea", image: new URL('../assets/choy1.jpg', import.meta.url).href, description: "Issiq qora choy" },
  { id: 42, nameUz: "Yashil Choy", nameEn: "Green Tea", nameRu: "Зеленый чай", price: 8500, category: "tea", image: new URL('../assets/choy2.jpg', import.meta.url).href, description: "Yangi yashil choy" },
  { id: 43, nameUz: "Oq Choy", nameEn: "White Tea", nameRu: "Белый чай", price: 9000, category: "tea", image: new URL('../assets/choy3.jpg', import.meta.url).href, description: "Nozik oq choy" },
  { id: 44, nameUz: "Kofe Americano", nameEn: "Coffee Americano", nameRu: "Кофе Американо", price: 12000, category: "coffee", image: new URL('../assets/kofe1.jpg', import.meta.url).href, description: "Kuchli americano kofe" },
  { id: 45, nameUz: "Kofe Latte", nameEn: "Coffee Latte", nameRu: "Кофе Латте", price: 14000, category: "coffee", image: new URL('../assets/kofe2.jpg', import.meta.url).href, description: "Kremli latte kofe" },
  { id: 46, nameUz: "Kofe Cappuccino", nameEn: "Coffee Cappuccino", nameRu: "Кофе Капучино", price: 13000, category: "coffee", image: new URL('../assets/kofe3.jpg', import.meta.url).href, description: "Ko'pik cappuccino kofe" },
  { id: 47, nameUz: "Kofe Espresso", nameEn: "Coffee Espresso", nameRu: "Кофе Эспрессо", price: 10000, category: "coffee", image: new URL('../assets/kofe4.jpg', import.meta.url).href, description: "Kuchli espresso shot" },
  { id: 48, nameUz: "Moka Kofe", nameEn: "Mocha", nameRu: "Мока", price: 15000, category: "coffee", image: new URL('../assets/kofe5.jpg', import.meta.url).href, description: "Kofe-shokolad aralashmasi" },
  { id: 49, nameUz: "Sovuq Kofe", nameEn: "Iced Coffee", nameRu: "Ледяной кофе", price: 14000, category: "coffee", image: new URL('../assets/kofe1.jpg', import.meta.url).href, description: "Sovuq kofe ichimlig" },
  { id: 50, nameUz: "Chai Latte", nameEn: "Chai Latte", nameRu: "Чай Латте", price: 13000, category: "tea", image: new URL('../assets/choy4.jpg', import.meta.url).href, description: "Masala choy latte" },
];
