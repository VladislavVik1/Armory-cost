// Объект с товарами и их ценами (здесь приведён пример, добавьте остальные по необходимости)
const priceList = {
                "АКМ весло": { "unitPrice": 500, "bulkPrice": 400 },
                "АКМС": { "unitPrice": 550, "bulkPrice": 450 },
                "АК-74": { "unitPrice": 600, "bulkPrice": 500 },
                "АКС-74Н": { "unitPrice": 650, "bulkPrice": 560 },
                "АКС-74Н-НПЗ-Планка": { "unitPrice": 750, "bulkPrice": 600 },
                "АКС-74Н(Б-13 Планка)": { "unitPrice": 800, "bulkPrice": 680 },
                "АК-74У": { "unitPrice": 450, "bulkPrice": 400 },
                "АК-74УН": { "unitPrice": 500, "bulkPrice": 450 },
                "АК103-105": { "unitPrice": 1000, "bulkPrice": 900 },
                "АК-103-105 Б13-Зенитка": { "unitPrice": 1100, "bulkPrice": 1000 },
                "ВАЛ": { "unitPrice": 900, "bulkPrice": 800 },
                "Винторез": { "unitPrice": 930, "bulkPrice": 820 },
                "М16А4 ручка транспортировки": { "unitPrice": 1000, "bulkPrice": 900 },
                "М16А4": { "unitPrice": 1050, "bulkPrice": 1000 },
                "М4А1": { "unitPrice": 1400, "bulkPrice": 1300 },
                "ФН-2000": { "unitPrice": 3000, "bulkPrice": 2400 },
                "HK G36KV": { "unitPrice": 2200, "bulkPrice": 2000 },
                "KH2002 CAMA": { "unitPrice": 2300, "bulkPrice": 2200 },
                "MK17+ ВСЕ ВАРИАЦИИ": { "unitPrice": 1900, "bulkPrice": 1800 },
                "M110-k5 M-LOCK (ACS) + 20 rnd SR-25 M993 AP (5 маг) + SHMIDT BENDER PMII 02": {"unitPrice": 36550, "bulkPrice": 3655 },
                "MSX": { "unitPrice": 3000, "bulkPrice": 3000 },
                // Пистолеты
                "ПМ": { "unitPrice": 100, "bulkPrice": 80 },
                "1911": { "unitPrice": 200, "bulkPrice": 150 },
                "6П9": { "unitPrice": 150, "bulkPrice": 100 },
                "RHINO": { "unitPrice": 400, "bulkPrice": 340 },
                "Glock 17": { "unitPrice": 600, "bulkPrice": 540 },
                "Glock 19": { "unitPrice": 700, "bulkPrice": 650 },
                "Glock 22": { "unitPrice": 900, "bulkPrice": 800 },
                "MP7A2": { "unitPrice": 1300, "bulkPrice": 1000 },
                "TT-33": { "unitPrice": 1000, "bulkPrice": 700 },

                // Снайперские винтовки
                "BARRET M82A1": { "unitPrice": 6000, "bulkPrice": 5700 },
                "M107": { "unitPrice": 5600, "bulkPrice": 5500 },
                "GM6-Lynx": { "unitPrice": 4000, "bulkPrice": 3700 },
                "М110К": { "unitPrice": 3000, "bulkPrice": 2700 },
                "М110К-1": { "unitPrice": 3500, "bulkPrice": 3000 },
                "М2010": { "unitPrice": 2000, "bulkPrice": 1800 },
                "СВД": { "unitPrice": 1500, "bulkPrice": 1400 },
                "СВДМ Планка": { "unitPrice": 1700, "bulkPrice": 1600 },
                "M2000": { "unitPrice": 5000, "bulkPrice": 5000 },


                // Пулеметы
                  "ПКM": { "unitPrice": 1300, "bulkPrice": 1200 },
                "ПКП": { "unitPrice": 1700, "bulkPrice": 1500 },
                "M249": { "unitPrice": 2200, "bulkPrice": 2000 },
                "М240(свинья)": { "unitPrice": 3000, "bulkPrice": 2500 },
                "FN-Minimi": { "unitPrice": 1800, "bulkPrice": 1600 },

                // Пистолеты-Пулеметы           
                "M3A1": { "unitPrice": 1200, "bulkPrice": 1000 },
                "P90": { "unitPrice": 3000, "bulkPrice": 2500 },
                "ПМ-63": { "unitPrice": 900, "bulkPrice": 850 },
                "Kriss Vector": { "unitPrice": 800, "bulkPrice": 700 },

                // Гранатометы и ПТУРы
                "АТ4 HEAT": { "unitPrice": 1500, "bulkPrice": null },
                "АТ4 HEDP": { "unitPrice": 1600, "bulkPrice": null },
                "АТ4 HP": { "unitPrice": 1700, "bulkPrice": null },
                "RPG-7": { "unitPrice": 3000, "bulkPrice": null },
                "РПГ-22": { "unitPrice": 600, "bulkPrice": null },
                "РПГ-26": { "unitPrice": 700, "bulkPrice": null },
                "РПГ-18": { "unitPrice": 600, "bulkPrice": null },
                "М72-А7": { "unitPrice": 800, "bulkPrice": null },
                "ПТУР МЕТИС": { "unitPrice": 7000, "bulkPrice": null },
                "МПРЛ ЗЕНИТКА": { "unitPrice": 10000, "bulkPrice": null },
                "ИГЛА": { "unitPrice": 10000, "bulkPrice": null },
                "РШГ": { "unitPrice": 2000, "bulkPrice": null },
                "СТИНГЕР": { "unitPrice": 11000, "bulkPrice": null },
                "ДЖЕВЕЛИН": { "unitPrice": 20000, "bulkPrice": null },
                "НЛАВ": { "unitPrice": 13000, "bulkPrice": null },
                "КАРЛ ГУСТАВ": { "unitPrice": 10000, "bulkPrice": null },
                "ГП для АК ( кроме АКСУ)": { "unitPrice": 400, "bulkPrice": 350 },
                "Костыль М320": { "unitPrice": 7000, "bulkPrice": 6700 },
                "Подствольный М208": { "unitPrice": 5000, "bulkPrice": 4500 },
                "MGL": { "unitPrice": 7000, "bulkPrice": 6700 },
                "Затяжка": { "unitPrice": 50000, "bulkPrice": 5000 }, 
                "Taureq": { "unitPrice": 28000, "bulkPrice": 28000 },
                "SECRET BOX from Mainland": { "unitPrice": 40000, "bulkPrice": 40000 },

                // Снаряды
                "ПГ7-ВЛ": { "unitPrice": 1400, "bulkPrice": null },
                "ПГ7-ВМ": { "unitPrice": 1600, "bulkPrice": null },
                "ПГ7-ВР": { "unitPrice": 2300, "bulkPrice": null },
                "ОГ-7": { "unitPrice": 1200, "bulkPrice": null },
                "9М135 HEAT": { "unitPrice": 4000, "bulkPrice": null },
                "9М135 HE": { "unitPrice": 3000, "bulkPrice": null },
                "9K38": { "unitPrice": 2000, "bulkPrice": null },
                "HEAT 75MM": { "unitPrice": 2000, "bulkPrice": null },
                "FGM-148": { "unitPrice": 5000, "bulkPrice": null },
                "FIM-92F": { "unitPrice": 1400, "bulkPrice": null },
                "TITAN ROCKET": { "unitPrice": 2500, "bulkPrice": null },

                // Патроны
                "5.45 30": { "unitPrice": 1000, "bulkPrice": 100 },
                "5.45 45": { "unitPrice": 5000, "bulkPrice": 500 },
                "5.45 60": { "unitPrice": 15000, "bulkPrice": 1500 },
                "7.62*39 30": { "unitPrice": 1000, "bulkPrice": 100 },
                "7.62*39 40": { "unitPrice": 7000, "bulkPrice": 700 },
                "7.62*39 75": { "unitPrice": 20000, "bulkPrice": 2000 },
                "9*39 10 СП5": { "unitPrice": 2000, "bulkPrice": 200 },
                "9*39 20 СП5": { "unitPrice": 5000, "bulkPrice": 500 },
                "9*39 10 СП6": { "unitPrice": 3000, "bulkPrice": 300 },
                "9*39 20 СП6": { "unitPrice": 7000, "bulkPrice": 700 },
                "5.56 30 M855": { "unitPrice": 1300, "bulkPrice": 130 },
                "5.56 40 M855": { "unitPrice": 8000, "bulkPrice": 800 },
                "5.56 60 M855A1": { "unitPrice": 20000, "bulkPrice": 2000 },
                ".300W (ДЛЯ М2010) 5": { "unitPrice": 4000, "bulkPrice": 400 },
                "7.62*54 КОРОБ 100 ЛПС": { "unitPrice": 10000, "bulkPrice": 1000 },
                "7.62*54 КОРОБ 100 БЗ": { "unitPrice": 40000, "bulkPrice": 4000 },
                "7.62*54 КОРОБ 100 ТРАССЕР": { "unitPrice": 12000, "bulkPrice": 1200 },
                "7.62*54 СВД 10 7Н1": { "unitPrice": 6000, "bulkPrice": 600 },
                "7.62*54 СВД 10 7Н14": { "unitPrice": 7000, "bulkPrice": 700 },
                "ДЛЯ М110 20": { "unitPrice": 9000, "bulkPrice": 900 },
                "7.62x51 М240 50": { "unitPrice": 5000, "bulkPrice": 500 },
                "7.62x51 М240 100": { "unitPrice": 10000, "bulkPrice": 1000 },
                "7.62x51 М240 200": { "unitPrice": 20000, "bulkPrice": 2000 },
                "7.62x51 (МК17) 20": { "unitPrice": 3000, "bulkPrice": 300 },
                "5.56 М249 100": { "unitPrice": 2500, "bulkPrice": 250 },
                "5.56 М249 200": { "unitPrice": 7000, "bulkPrice": 700 },
                "G36 30": { "unitPrice": 3400, "bulkPrice": 340 },
                "6.5 30": { "unitPrice": 8000, "bulkPrice": 800 },
                "12.7x99 AMAX": { "unitPrice": 13000, "bulkPrice": 1300 },
                "12.7x99 БЗ": { "unitPrice": 28000, "bulkPrice": 2800 },
                "12.7x99 Трассер": { "unitPrice": 12000, "bulkPrice": 1200 },
                ".408 M2000 7": { "unitPrice": 10000, "bulkPrice": 1000 },
                "40MM 6 HE": { "unitPrice": 18000, "bulkPrice": 1800 },
                "40MM 6 HET": { "unitPrice": 20000, "bulkPrice": 2000 },
                "40MM 6 HEDP": { "unitPrice": 25000, "bulkPrice": 2500 },
                "40MM 6 LIGHT": { "unitPrice": 5000, "bulkPrice": 500 },
                "40MM 6 SMOKE": { "unitPrice": 7000, "bulkPrice": 700 },
                "5.7 P90 50": { "unitPrice": 4000, "bulkPrice": 400 },
                "M1911 7": { "unitPrice": 3000, "bulkPrice": 300 },
                "9*18 8": { "unitPrice": 2000, "bulkPrice": 200 },
                "9*19 17": { "unitPrice": 4000, "bulkPrice": 400 },
                "9*19 20": { "unitPrice": 5000, "bulkPrice": 500 },
                "MP7 40 FMJ": { "unitPrice": 9000, "bulkPrice": 900 },
                "7.62*25 TT": { "unitPrice": 3000, "bulkPrice": 300 },
                ".45ACP 6": { "unitPrice": 3000, "bulkPrice": 300 },
                "300 BLK": { "unitPrice": 3000, "bulkPrice": 300 },
                "Патроны для пистолета": { "unitPrice": 300, "bulkPrice": 30 },
                "Россыпь для автомата": { "unitPrice": 750, "bulkPrice": 75 },
                "Патроны для винтовки": { "unitPrice": 1000, "bulkPrice": 100 },
                "Ленты для пулемета": { "unitPrice": 1100, "bulkPrice": 110 },
                // Медицинские товары                
                 "Повязка": { "unitPrice": 1000, "bulkPrice": 100 },
                "Давящая повязка": { "unitPrice": 1200, "bulkPrice": 120 },
                "Тампонирующий бинт": { "unitPrice": 1100, "bulkPrice": 110 },
                "Тампонирующий бинь пропитанный целоксом": { "unitPrice": 1400, "bulkPrice": 140 },
                "Обезболивающие таблетки": { "unitPrice": 1500, "bulkPrice": 150 },
                "Морфин": { "unitPrice": 5000, "bulkPrice": 500 },
                "Норадреналин": { "unitPrice": 3000, "bulkPrice": 300 },
                "Шины": { "unitPrice": 3000, "bulkPrice": 300 },
                "Мешки для трупов": { "unitPrice": 200, "bulkPrice": 200 },
                "Турникет type CAT": { "unitPrice": 150, "bulkPrice": 150 },
                "250 мл крови": { "unitPrice": 1200, "bulkPrice": 120 },
                "500 мл крови": { "unitPrice": 2400, "bulkPrice": 240 },
                "1000 мл крови": { "unitPrice": 3600, "bulkPrice": 360 },
                "250 мл физ раствора": { "unitPrice": 1000, "bulkPrice": 100 },
                "500 мл физ раствора": { "unitPrice": 2000, "bulkPrice": 200 },
                "1000 мл физ раствора": { "unitPrice": 3000, "bulkPrice": 300 },
                "250 мл плазмы": { "unitPrice": 1100, "bulkPrice": 110 },
                "500 мл плазмы": { "unitPrice": 2200, "bulkPrice": 220 },
                "1000 мл плазмы": { "unitPrice": 3300, "bulkPrice": 330 },


                // Калиматорные прицелы                   
                "RACURS": { "unitPrice": 400, "bulkPrice": 400 },
                "SLIGHT": { "unitPrice": 300, "bulkPrice": 300 },
                "AIMPOINT MICRO T1": { "unitPrice": 500, "bulkPrice": 500 },
                "SIG SAUER ROMEO": { "unitPrice": 500, "bulkPrice": 500 },
                "AIMPOINT 3000": { "unitPrice": 400, "bulkPrice": 400 },
                "AIMPOINT 5000": { "unitPrice": 500, "bulkPrice": 500 },
                "BURRIS FAST FIRE": { "unitPrice": 300, "bulkPrice": 300 },
                "C-MORE RAILWAY": { "unitPrice": 700, "bulkPrice": 700 },
                "DOCTER SLIGHT": { "unitPrice": 300, "bulkPrice": 300 },
                "AIMPOINT MICRO T2": { "unitPrice": 800, "bulkPrice": 800 },
                "LEAP T2": { "unitPrice": 700, "bulkPrice": 700 },
                "LEUPOLD LCO": { "unitPrice": 900, "bulkPrice": 900 },
                "MICRO T1 + MAGNIF": { "unitPrice": 1500, "bulkPrice": 1400 },
                "МАГНИФАЕР +": { "unitPrice": 700, "bulkPrice": 700 },
                "MRDS": { "unitPrice": 500, "bulkPrice": 500 },
                "RX 0 REFLEX": { "unitPrice": 700, "bulkPrice": 700 },
                "ТЕПЛО +": { "unitPrice": 1500, "bulkPrice": 1300 },
                // Галографические прицелы                   
                "ЕКП 8-18": { "unitPrice": 200, "bulkPrice": 200 },
                "ОКП 7": { "unitPrice": 300, "bulkPrice": 300 },
                "1П87": { "unitPrice": 400, "bulkPrice": 400 },
                "EOTECH XPS3": { "unitPrice": 700, "bulkPrice": 700 },
                "EOTECH XPS3 + MAGN": { "unitPrice": 1400, "bulkPrice": 1300 },
                "EOTECH 553": { "unitPrice": 800, "bulkPrice": 800 },
                // Оптические прицелы 1х - 4х 
                  "AN-PVQ 31A (3X)": { "unitPrice": 3000, "bulkPrice": 3000 },
                "BURRIS XTR 2 + MICRO": { "unitPrice": 3500, "bulkPrice": 3500 },
                "AIMPOINT T2 SKETTIER": { "unitPrice": 4500, "bulkPrice": 4000 },
                "ELAN SPECTER": { "unitPrice": 3000, "bulkPrice": 3000 },
                "SU-230+ PVS1-4": { "unitPrice": 4000, "bulkPrice": 4000 },
                "HENSOLDT": { "unitPrice": 2500, "bulkPrice": 2500 },
                "HENSOLDT + MRDS": { "unitPrice": 3000, "bulkPrice": 3000 },
                "VALADA PITBULL 2": { "unitPrice": 2500, "bulkPrice": 2500 },
                "M145": { "unitPrice": 2500, "bulkPrice": 2500 },
                "M150": { "unitPrice": 3000, "bulkPrice": 3000 },
                "SIG BRAVO 4 (APEX)": { "unitPrice": 3000, "bulkPrice": 3000 },
                "SPECTER DR": { "unitPrice": 2500, "bulkPrice": 2500 },
                "SU-230": { "unitPrice": 2500, "bulkPrice": 2500 },
                "SU-230 + MRDS": { "unitPrice": 4000, "bulkPrice": 4000 },
                "ПСО-1М2": { "unitPrice": 3000, "bulkPrice": 1900 },
                "КОБРА-АК": { "unitPrice": 2000, "bulkPrice": 1900 },
                "АК-ПС": { "unitPrice": 2500, "bulkPrice": 2300 },
                "ПГО7(2,3)": { "unitPrice": 1500, "bulkPrice": 1300 },
                "1ПН-93 (1,2)": { "unitPrice": 2300, "bulkPrice": 2000 },
                
                // Оптические прицелы 3х > 28х      
                "SQBSS 1-8": { "unitPrice": 13000, "bulkPrice": 2000  },
                "SQBSS 1-8 + TEPLO": { "unitPrice": 35000, "bulkPrice": 2000 },
                "KAHLES ZF95": { "unitPrice": 12000, "bulkPrice": 2000  },
                "LEUPOLD M3A ULTRA": { "unitPrice": 35000, "bulkPrice": 2000  },
                "LEUPOLD MK4 2X-7X": { "unitPrice": 30000, "bulkPrice": 2000  },
                "LEUPOLD MK4 + TEPLO": { "unitPrice": 45000, "bulkPrice": 2000  },
                "M8541A 12X": { "unitPrice": 30000, "bulkPrice": 2000  },
                "MK4 M3 2.5X - 7X": { "unitPrice": 20000, "bulkPrice": 2000  },
                "MK4 M5 4.6X -14X": { "unitPrice": 25000, "bulkPrice": 2000  },
                "MOS 2.3X - 5X": { "unitPrice": 25000, "bulkPrice": 2000  },
                "ATACR 1-8X": { "unitPrice": 14000, "bulkPrice": 2000  },
                "ATACR 2-18X": { "unitPrice": 20000, "bulkPrice": 2000  },
                "ATACR 2-18 + TEPLO": { "unitPrice": 29000, "bulkPrice": 2000  },
                "NIGHTFORCE 1-8X": { "unitPrice": 13000, "bulkPrice": 2000  },
                "NIGHTFORCE 1-8X + T1": { "unitPrice": 14000, "bulkPrice": 2000  },
                "NIGHTFORCE 1-8X MRDS": { "unitPrice": 15000, "bulkPrice": 2000  },
                "NIGHTFORCE NXS 5.6 - 22.7X": { "unitPrice": 30000, "bulkPrice": 2000  },
                "NIGHTFORCE ATACR 7X-35X": { "unitPrice": 34000, "bulkPrice": 2000  },
                "NIGHTSTALKER 4X-10X": { "unitPrice": 90000, "bulkPrice": 2000  },
                "NVS 5X": { "unitPrice": 25000, "bulkPrice": 2000  },
                "NXS 3-15X": { "unitPrice": 13000, "bulkPrice": 2000  },
                "NXS 5.5-22X": { "unitPrice": 18000, "bulkPrice": 2000  },
                "RAZOR 1.0-10X": { "unitPrice": 25000, "bulkPrice": 2000  },
                "RAZOR 1.0-6X": { "unitPrice": 17000, "bulkPrice": 2000  },
                "S&B SHORT DOT 1-8X": { "unitPrice": 18000, "bulkPrice": 2000  },
                "S&B SHORT DOT 1-8X + MRDS": { "unitPrice": 20000, "bulkPrice": 2000  },
                "SPECTER DR 1.5-6X": { "unitPrice": 14000, "bulkPrice": 2000  },
                "US-OPTICS MR10 2.9-8.8X": { "unitPrice": 18000, "bulkPrice": 2000  },
                "MRDS +": { "unitPrice": 2000, "bulkPrice": 2000  },
                "AIMPOINT T1 +": { "unitPrice": 1000, "bulkPrice": 2000  },
                "ТЕПЛАК НА НЕКОТОРЫЕ ПРИЦЕЛЫ": { "unitPrice": 100, "bulkPrice": 2000  },              
                
                
                // Добавьте другие товары с их ценами
                "Глушители": { "unitPrice": 6000, "bulkPrice": 600  },
                "Пламягаситель": { "unitPrice": 3000, "bulkPrice": 300  },
                "Ручка переноса огня": { "unitPrice": 1000, "bulkPrice": 100  },
                "Сошки": { "unitPrice": 2000, "bulkPrice": 200  },
                "PVS-14": { "unitPrice": 7000, "bulkPrice": 700  },
                "PVS-31": { "unitPrice": 15000, "bulkPrice": 1500  },
                "PVS Panoramic": { "unitPrice": 42000, "bulkPrice": 4200  },
                "PVS-31 + thermal imager": { "unitPrice": 20000, "bulkPrice": 2000  },
                "PVS Panoramic + thermal imager": { "unitPrice": 65000, "bulkPrice": 6500  },
                "Dbal": { "unitPrice": 50000, "bulkPrice": 5000  },
                "Легкая техника": {
                    "unitPrice": 1000,
                    "Запчасти": { "Колёса": 200 }
                },
                "Средняя техника (БТР, БМП...)": {
                    "unitPrice": 3000,
                    "Запчасти": { "Траки": 300 }
                },
                "Тяжелая техника": {
                    "unitPrice": 7000,
                    "Дополнительные услуги": { "Точная настройка ГРАДов, НУРСов": 1000 }
                },
                "Ремонт вертолётов СССР": { "unitPrice": 10000 },
                "Ремонт НАТО вертолётов": { "unitPrice": 15000 },
                "Ремонт самолётов СССР": { "unitPrice": 15000 },
                "Ремонт НАТО самолётов": { "unitPrice": 20000 },
                "Bird": { "unitPrice": 40000, "bulkPrice": 4000 },
                "Territoty": { "unitPrice": 400000, "bulkPrice": 400000 },
                "Комплектация Обвесов": { "unitPrice": 60000, "bulkPrice": 6000 },
};
// Корзина (изначально пустая)
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function openModal(category) {
    let content = '';
    switch (category) {
        case 'automats':
                    content = '<h2>Автоматы</h2><table><tr><th>Автомат</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr><tr><td>АКМ весло</td><td>500</td><td>4000</td><td><button onclick="addToCart(\'АКМ весло\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКМ весло\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКМС</td><td>550</td><td>4500</td><td><button onclick="addToCart(\'АКМС\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКМС\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-74</td><td>600</td><td>5000</td><td><button onclick="addToCart(\'АК-74\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-74\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКС-74Н</td><td>650</td><td>5600</td><td><button onclick="addToCart(\'АКС-74Н\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКС-74Н\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКС-74Н-НПЗ-Планка</td><td>750</td><td>6000</td><td><button onclick="addToCart(\'АКС-74Н-НПЗ-Планка\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКС-74Н-НПЗ-Планка\', 10)">Добавить 10 шт</button></td></tr><tr><td>АКС-74Н(Б-13 Планка)</td><td>800</td><td>6800</td><td><button onclick="addToCart(\'АКС-74Н(Б-13 Планка)\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АКС-74Н(Б-13 Планка)\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-74У</td><td>450</td><td>4000</td><td><button onclick="addToCart(\'АК-74У\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-74У\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-74УН</td><td>500</td><td>4500</td><td><button onclick="addToCart(\'АК-74УН\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-74УН\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК103-105</td><td>1000</td><td>9000</td><td><button onclick="addToCart(\'АК103-105\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК103-105\', 10)">Добавить 10 шт</button></td></tr><tr><td>АК-103-105 Б13-Зенитка</td><td>1100</td><td>10 000</td><td><button onclick="addToCart(\'АК-103-105 Б13-Зенитка\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'АК-103-105 Б13-Зенитка\', 10)">Добавить 10 шт</button></td></tr><tr><td>ВАЛ</td><td>900</td><td>8000</td><td><button onclick="addToCart(\'ВАЛ\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'ВАЛ\', 10)">Добавить 10 шт</button></td></tr><tr><td>Винторез</td><td>930</td><td>8200</td><td><button onclick="addToCart(\'Винторез\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'Винторез\', 10)">Добавить 10 шт</button></td></tr><tr><td>М16А4 ручка транспортировки</td><td>1000</td><td>9000</td><td><button onclick="addToCart(\'М16А4 ручка транспортировки\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'М16А4 ручка транспортировки\', 10)">Добавить 10 шт</button></td></tr><tr><td>М16А4</td><td>1050</td><td>10 000</td><td><button onclick="addToCart(\'М16А4\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'М16А4\', 10)">Добавить 10 шт</button></td></tr><tr><td>М4А1</td><td>1400</td><td>13 000</td><td><button onclick="addToCart(\'М4А1\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'М4А1\', 10)">Добавить 10 шт</button></td></tr><tr><td>ФН-2000</td><td>3000</td><td>24 000</td><td><button onclick="addToCart(\'ФН-2000\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'ФН-2000\', 10)">Добавить 10 шт</button></td></tr><tr><td>HK G36KV</td><td>2200</td><td>20 000</td><td><button onclick="addToCart(\'HK G36KV\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'HK G36KV\', 10)">Добавить 10 шт</button></td></tr><tr><td>KH2002 CAMA</td><td>2300</td><td>22 000</td><td><button onclick="addToCart(\'KH2002 CAMA\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'KH2002 CAMA\', 10)">Добавить 10 шт</button></td></tr><tr><td>MK17+ ВСЕ ВАРИАЦИИ</td><td>1900</td><td>18 000</td><td><button onclick="addToCart(\'MK17+ ВСЕ ВАРИАЦИИ\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'MK17+ ВСЕ ВАРИАЦИИ\', 10)">Добавить 10 шт</button></td></tr><tr><td>MSX</td><td>3000</td><td>30 000</td><td><button onclick="addToCart(\'MSX\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'MSX\', 10)">Добавить 10 шт</button></td></tr></table>';
                    break;
                case 'pistols':
                    content = '<h2>Пистолеты</h2><table><tr><th>Пистолет</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr><tr><td>ПМ</td><td>100</td><td>800</td><td><button onclick="addToCart(\'ПМ\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'ПМ\', 10)">Добавить 10 шт</button></td></tr><tr><td>1911</td><td>200</td><td>1500</td><td><button onclick="addToCart(\'1911\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'1911\', 10)">Добавить 10 шт</button></td></tr><tr><td>6П9</td><td>150</td><td>1000</td><td><button onclick="addToCart(\'6П9\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'6П9\', 10)">Добавить 10 шт</button></td></tr><tr><td>RHINO</td><td>400</td><td>3400</td><td><button onclick="addToCart(\'RHINO\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'RHINO\', 10)">Добавить 10 шт</button></td></tr><tr><td>Glock 17</td><td>600</td><td>5400</td><td><button onclick="addToCart(\'Glock 17\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'Glock 17\', 10)">Добавить 10 шт</button></td></tr><tr><td>Glock 19</td><td>700</td><td>6500</td><td><button onclick="addToCart(\'Glock 19\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'Glock 19\', 10)">Добавить 10 шт</button></td></tr><tr><td>Glock 22</td><td>900</td><td>8000</td><td><button onclick="addToCart(\'Glock 22\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'Glock 22\', 10)">Добавить 10 шт</button></td></tr><tr><td>MP7A2</td><td>1300</td><td>10 000</td><td><button onclick="addToCart(\'MP7A2\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'MP7A2\', 10)">Добавить 10 шт</button></td></tr><tr><td>TT-33</td><td>1000</td><td>7000</td><td><button onclick="addToCart(\'TT-33\', 1)">Добавить 1 шт</button><button onclick="addToCart(\'TT-33\', 10)">Добавить 10 шт</button></td></tr></table >';
                    break;
                case 'pp':
                    content = '<h2>Пистолеты-Пулеметы</h2><table><tr><th>Пистолет</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +
    '<tr><td>M3A1</td><td>1200</td><td>10 000</td><td><button onclick="addToCart(\'M3A1\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'M3A1\', 10)">Добавить 10 шт</button></td></tr>' +
    '<tr><td>P90</td><td>3000</td><td>25 000</td><td><button onclick="addToCart(\'P90\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'P90\', 10)">Добавить 10 шт</button></td></tr>' +
    '<tr><td>ПМ-63</td><td>900</td><td>8500</td><td><button onclick="addToCart(\'ПМ-63\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'ПМ-63\', 10)">Добавить 10 шт</button></td></tr>' +
    '<tr><td>Kriss Vector</td><td>800</td><td>7000</td><td><button onclick="addToCart(\'Kriss Vector\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'Kriss Vector\', 10)">Добавить 10 шт</button></td></tr>' +
    '</table>';
                    break;
                case 'heavy':
    content = '<h2>Гранатомёты</h2><table>' +
        '<tr><th>Гранатомёт маленький</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>ГП для АК ( кроме АКСУ)</td><td>400</td><td>3500</td>' +
        '<td><button onclick="addToCart(\'ГП для АК ( кроме АКСУ)\', 1)">Добавить 1 шт</button>' +
        '<button onclick="addToCart(\'ГП для АК ( кроме АКСУ)\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Костыль М320</td><td>7000</td><td>67 000</td>' +
        '<td><button onclick="addToCart(\'Костыль М320\', 1)">Добавить 1 шт</button>' +
        '<button onclick="addToCart(\'Костыль М320\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Подствольный М208</td><td>5000</td><td>45 000</td>' +
        '<td><button onclick="addToCart(\'Подствольный М208\', 1)">Добавить 1 шт</button>' +
        '<button onclick="addToCart(\'Подствольный М208\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>MGL</td><td>7000</td><td>67 000</td>' +
        '<td><button onclick="addToCart(\'MGL\', 1)">Добавить 1 шт</button>' +
        '<button onclick="addToCart(\'MGL\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><th colspan="4">Трубы и системы</th></tr>' +

        '<tr><td>АТ4 HEAT</td><td>1500</td><td>-</td>' +
        '<td><button onclick="addToCart(\'АТ4 HEAT\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>AT4 HEDP</td><td>1600</td><td>-</td>' +
        '<td><button onclick="addToCart(\'AT4 HEDP\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>AT4 HP</td><td>1700</td><td>-</td>' +
        '<td><button onclick="addToCart(\'AT4 HP\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>RPG-7</td><td>3000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'RPG-7\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>РПГ-22</td><td>600</td><td>-</td>' +
        '<td><button onclick="addToCart(\'РПГ-22\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>РПГ-26</td><td>700</td><td>-</td>' +
        '<td><button onclick="addToCart(\'РПГ-26\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>РПГ-18</td><td>600</td><td>-</td>' +
        '<td><button onclick="addToCart(\'РПГ-18\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>М72-А7</td><td>800</td><td>-</td>' +
        '<td><button onclick="addToCart(\'М72-А7\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ПТУР МЕТИС</td><td>7000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'ПТУР МЕТИС\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>МПРЛ ЗЕНИТКА</td><td>10 000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'МПРЛ ЗЕНИТКА\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ИГЛА</td><td>10 000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'ИГЛА\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>РШГ</td><td>2000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'РШГ\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>СТИНГЕР</td><td>11 000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'СТИНГЕР\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ДЖЕВЕЛИН</td><td>20 000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'ДЖЕВЕЛИН\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>НЛАВ</td><td>13 000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'НЛАВ\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>КАРЛ ГУСТАВ</td><td>10 000</td><td>-</td>' +
        '<td><button onclick="addToCart(\'КАРЛ ГУСТАВ\', 1)">Добавить 1 шт</button></td></tr>' +

        '</table>';
    break;
                case 'heavyammo':
    content = '<h2>Снаряды</h2><table><tr><th>Снаряд</th><th>Цена за 1 шт $</th><th>Добавить в корзину</th></tr>' +
        '<tr><td>ПГ7-ВЛ</td><td>1400</td><td><button onclick="addToCart(\'ПГ7-ВЛ\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>ПГ7-ВМ</td><td>1600</td><td><button onclick="addToCart(\'ПГ7-ВМ\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>ПГ7-ВР</td><td>2300</td><td><button onclick="addToCart(\'ПГ7-ВР\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>ОГ-7</td><td>1200</td><td><button onclick="addToCart(\'ОГ-7\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>9М135 HEAT</td><td>4000</td><td><button onclick="addToCart(\'9М135 HEAT\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>9М135 HE</td><td>3000</td><td><button onclick="addToCart(\'9М135 HE\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>9K38</td><td>2000</td><td><button onclick="addToCart(\'9K38\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>HEAT 75MM</td><td>2000</td><td><button onclick="addToCart(\'HEAT 75MM\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>FGM-148</td><td>5000</td><td><button onclick="addToCart(\'FGM-148\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>FIM-92F</td><td>1400</td><td><button onclick="addToCart(\'FIM-92F\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>TITAN ROCKET</td><td>2500</td><td><button onclick="addToCart(\'TITAN ROCKET\', 1)">Добавить 1 шт</button></td></tr>' +
        '</table>';
    break;
                case 'sniper':
    content = '<h2>Снайперские винтовки</h2><table>' +
        '<tr><th>Винтовка</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +
        '<tr><td>СВД</td><td>1500</td><td>14 000</td><td><button onclick="addToCart(\'СВД\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'СВД\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>СВДМ Планка</td><td>1700</td><td>16 000</td><td><button onclick="addToCart(\'СВДМ Планка\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'СВДМ Планка\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>M2000</td><td>5000</td><td>50 000</td><td><button onclick="addToCart(\'M2000\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'M2000\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>BARRET M82A1</td><td>6000</td><td>57 000</td><td><button onclick="addToCart(\'BARRET M82A1\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'BARRET M82A1\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>M107</td><td>5600</td><td>55 000</td><td><button onclick="addToCart(\'M107\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'M107\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>GM6-Lynx</td><td>4000</td><td>37 000</td><td><button onclick="addToCart(\'GM6-Lynx\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'GM6-Lynx\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>М110К</td><td>3000</td><td>27 000</td><td><button onclick="addToCart(\'М110К\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'М110К\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>М110К-1</td><td>3500</td><td>30 000</td><td><button onclick="addToCart(\'М110К-1\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'М110К-1\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>М2010</td><td>2000</td><td>18 000</td><td><button onclick="addToCart(\'М2010\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'М2010\', 10)">Добавить 10 шт</button></td></tr>' +
        '</table>';
    break;
                case 'machineguns':
    content = '<h2>Пулеметы</h2><table>' +
        '<tr><th>Пулемет</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +
        '<tr><td>ПКM</td><td>1300</td><td>12 000</td><td><button onclick="addToCart(\'ПКM\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'ПКM\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>ПКП</td><td>1700</td><td>15 000</td><td><button onclick="addToCart(\'ПКП\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'ПКП\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>M249</td><td>2200</td><td>20 000</td><td><button onclick="addToCart(\'M249\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'M249\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>М240(свинья)</td><td>3000</td><td>25 000</td><td><button onclick="addToCart(\'М240(свинья)\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'М240(свинья)\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>FN-Minimi</td><td>1800</td><td>16 000</td><td><button onclick="addToCart(\'FN-Minimi\', 1)">Добавить 1 шт</button> <button onclick="addToCart(\'FN-Minimi\', 10)">Добавить 10 шт</button></td></tr>' +
        '</table>';
    break;
                case 'grass':
    content = '<h2>Пачки, ленты патронов</h2><table>' +
        '<tr><th>Тип</th><th>Цена за 10 пачек $</th><th>Добавить в корзину</th></tr>' +
        '<tr><td>Патроны для пистолета</td><td>300</td><td><button onclick="addToCart(\'Патроны для пистолета\', 1)">Добавить 10 пачек патронов</button></td></tr>' +
        '<tr><td>Патроны для автомата</td><td>750</td><td><button onclick="addToCart(\'Россыпь для автомата\', 1)">Добавить 10 пачек патронов</button></td></tr>' +
        '<tr><td>Патроны для винтовки</td><td>1000</td><td><button onclick="addToCart(\'Патроны для винтовки\', 1)">Добавить 10 пачек патронов</button></td></tr>' +
        '<tr><td>Ленты для пулемета</td><td>1100</td><td><button onclick="addToCart(\'Ленты для пулемета\', 1)">Добавить 4 ленты</button></td></tr>' +
        '</table>';
    break;
                case 'scopesholo':
    content = '<h2>Прицелы Голографические</h2><table>' +
        '<tr><th>Прицел</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +
        '<tr><td>ЕКП 8-18</td><td>200</td><td>2000</td><td>' +
        '<button onclick="addToCart(\'ЕКП 8-18\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'ЕКП 8-18\', 10)">Добавить 10 шт</button></td></tr>' +
        
        '<tr><td>ОКП 7</td><td>300</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'ОКП 7\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'ОКП 7\', 10)">Добавить 10 шт</button></td></tr>' +
        
        '<tr><td>1П87</td><td>400</td><td>4000</td><td>' +
        '<button onclick="addToCart(\'1П87\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'1П87\', 10)">Добавить 10 шт</button></td></tr>' +
        
        '<tr><td>EOTECH XPS3</td><td>700</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'EOTECH XPS3\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'EOTECH XPS3\', 10)">Добавить 10 шт</button></td></tr>' +
        
        '<tr><td>EOTECH XPS3 + MAGN</td><td>1400</td><td>13 000</td><td>' +
        '<button onclick="addToCart(\'EOTECH XPS3 + MAGN\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'EOTECH XPS3 + MAGN\', 10)">Добавить 10 шт</button></td></tr>' +
        
        '<tr><td>EOTECH 553</td><td>800</td><td>8000</td><td>' +
        '<button onclick="addToCart(\'EOTECH 553\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'EOTECH 553\', 10)">Добавить 10 шт</button></td></tr>' +
        
        '</table>';
            break;
                case 'scopescal':
    content = '<h2>Прицелы Калиматорные</h2><table>' +
        '<tr><th>Прицел</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +
        
        '<tr><td>RACURS</td><td>400</td><td>4000</td><td>' +
        '<button onclick="addToCart(\'RACURS\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'RACURS\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SLIGHT</td><td>300</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'SLIGHT\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SLIGHT\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>AIMPOINT MICRO T1</td><td>500</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'AIMPOINT MICRO T1\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'AIMPOINT MICRO T1\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SIG SAUER ROMEO</td><td>500</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'SIG SAUER ROMEO\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SIG SAUER ROMEO\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>AIMPOINT 3000</td><td>400</td><td>4000</td><td>' +
        '<button onclick="addToCart(\'AIMPOINT 3000\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'AIMPOINT 3000\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>AIMPOINT 5000</td><td>500</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'AIMPOINT 5000\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'AIMPOINT 5000\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>BURRIS FAST FIRE</td><td>300</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'BURRIS FAST FIRE\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'BURRIS FAST FIRE\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>C-MORE RAILWAY</td><td>700</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'C-MORE RAILWAY\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'C-MORE RAILWAY\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>DOCTER SLIGHT</td><td>300</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'DOCTER SLIGHT\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'DOCTER SLIGHT\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>AIMPOINT MICRO T2</td><td>800</td><td>8000</td><td>' +
        '<button onclick="addToCart(\'AIMPOINT MICRO T2\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'AIMPOINT MICRO T2\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>LEAP T2</td><td>700</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'LEAP T2\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'LEAP T2\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>LEUPOLD LCO</td><td>900</td><td>9000</td><td>' +
        '<button onclick="addToCart(\'LEUPOLD LCO\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'LEUPOLD LCO\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>MICRO T1 + MAGNIF</td><td>1500</td><td>14 000</td><td>' +
        '<button onclick="addToCart(\'MICRO T1 + MAGNIF\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'MICRO T1 + MAGNIF\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>МАГНИФАЕР +</td><td>700</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'МАГНИФАЕР +\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'МАГНИФАЕР +\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>MRDS</td><td>500</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'MRDS\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'MRDS\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>RX 0 REFLEX</td><td>700</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'RX 0 REFLEX\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'RX 0 REFLEX\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>ТЕПЛО +</td><td>1500</td><td>13 000</td><td>' +
        '<button onclick="addToCart(\'ТЕПЛО +\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'ТЕПЛО +\', 10)">Добавить 10 шт</button></td></tr>' +

        '</table>';
    break;
                case 'scopesxfour':
    content = '<h2>Прицелы 1Х-4Х</h2><table>' +
        '<tr><th>Прицел</th><th>Цена за 1 шт $</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>AN-PVQ 31A (3X)</td><td>3000</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'AN-PVQ 31A (3X)\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'AN-PVQ 31A (3X)\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>BURRIS XTR 2 + MICRO</td><td>3500</td><td>35 000</td><td>' +
        '<button onclick="addToCart(\'BURRIS XTR 2 + MICRO\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'BURRIS XTR 2 + MICRO\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>AIMPOINT T2 SKETTIER</td><td>4500</td><td>45 000</td><td>' +
        '<button onclick="addToCart(\'AIMPOINT T2 SKETTIER\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'AIMPOINT T2 SKETTIER\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>ELAN SPECTER</td><td>3000</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'ELAN SPECTER\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'ELAN SPECTER\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SU-230+ PVS1-4</td><td>4000</td><td>40 000</td><td>' +
        '<button onclick="addToCart(\'SU-230+ PVS1-4\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SU-230+ PVS1-4\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>HENSOLDT</td><td>2500</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'HENSOLDT\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'HENSOLDT\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>HENSOLDT + MRDS</td><td>3000</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'HENSOLDT + MRDS\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'HENSOLDT + MRDS\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>VALADA PITBULL 2</td><td>2500</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'VALADA PITBULL 2\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'VALADA PITBULL 2\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>M145</td><td>2500</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'M145\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'M145\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>M150</td><td>3000</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'M150\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'M150\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SIG BRAVO 4 (APEX)</td><td>3000</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'SIG BRAVO 4 (APEX)\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SIG BRAVO 4 (APEX)\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SPECTER DR</td><td>2500</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'SPECTER DR\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SPECTER DR\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SU-230</td><td>2500</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'SU-230\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SU-230\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>SU-230 + MRDS</td><td>4000</td><td>40 000</td><td>' +
        '<button onclick="addToCart(\'SU-230 + MRDS\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'SU-230 + MRDS\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>ПСО-1М2</td><td>3000</td><td>19 000</td><td>' +
        '<button onclick="addToCart(\'ПСО-1М2\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'ПСО-1М2\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>КОБРА-АК</td><td>2000</td><td>19 000</td><td>' +
        '<button onclick="addToCart(\'КОБРА-АК\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'КОБРА-АК\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>АК-ПС</td><td>2500</td><td>23 000</td><td>' +
        '<button onclick="addToCart(\'АК-ПС\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'АК-ПС\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>ПГО7(2,3)</td><td>1500</td><td>13 000</td><td>' +
        '<button onclick="addToCart(\'ПГО7(2,3)\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'ПГО7(2,3)\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>1ПН-93 (1,2)</td><td>2300</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'1ПН-93 (1,2)\', 1)">Добавить 1 шт</button> ' +
        '<button onclick="addToCart(\'1ПН-93 (1,2)\', 10)">Добавить 10 шт</button></td></tr>' +

        '</table>';
    break;
                case 'scopesxinf':
    content = '<h2>Прицелы Оптические</h2><table>' +
        '<tr><th>Прицел</th><th>Цена за 1 шт $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>SQBSS 1-8</td><td>13 000</td><td>' +
        '<button onclick="addToCart(\'SQBSS 1-8\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>SQBSS 1-8 + TEPLO</td><td>35 000</td><td>' +
        '<button onclick="addToCart(\'SQBSS 1-8 + TEPLO\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>KAHLES ZF95</td><td>12 000</td><td>' +
        '<button onclick="addToCart(\'KAHLES ZF95\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>LEUPOLD M3A ULTRA</td><td>35 000</td><td>' +
        '<button onclick="addToCart(\'LEUPOLD M3A ULTRA\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>LEUPOLD MK4 2X-7X</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'LEUPOLD MK4 2X-7X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>LEUPOLD MK4 + TEPLO</td><td>45 000</td><td>' +
        '<button onclick="addToCart(\'LEUPOLD MK4 + TEPLO\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>M8541A 12X</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'M8541A 12X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>MK4 M3 2.5X - 7X</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'MK4 M3 2.5X - 7X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>MK4 M5 4.6X -14X</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'MK4 M5 4.6X -14X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>MOS 2.3X - 5X</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'MOS 2.3X - 5X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ATACR 1-8X</td><td>14 000</td><td>' +
        '<button onclick="addToCart(\'ATACR 1-8X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ATACR 2-18X</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'ATACR 2-18X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ATACR 2-18 + TEPLO</td><td>29 000</td><td>' +
        '<button onclick="addToCart(\'ATACR 2-18 + TEPLO\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NIGHTFORCE 1-8X</td><td>13 000</td><td>' +
        '<button onclick="addToCart(\'NIGHTFORCE 1-8X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NIGHTFORCE 1-8X + T1</td><td>14 000</td><td>' +
        '<button onclick="addToCart(\'NIGHTFORCE 1-8X + T1\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NIGHTFORCE 1-8X MRDS</td><td>15 000</td><td>' +
        '<button onclick="addToCart(\'NIGHTFORCE 1-8X MRDS\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NIGHTFORCE NXS 5.6 - 22.7X</td><td>30 000</td><td>' +
        '<button onclick="addToCart(\'NIGHTFORCE NXS 5.6 - 22.7X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NIGHTFORCE ATACR 7X-35X</td><td>34 000</td><td>' +
        '<button onclick="addToCart(\'NIGHTFORCE ATACR 7X-35X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NIGHTSTALKER 4X-10X</td><td>90 000</td><td>' +
        '<button onclick="addToCart(\'NIGHTSTALKER 4X-10X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NVS 5X</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'NVS 5X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NXS 3-15X</td><td>13 000</td><td>' +
        '<button onclick="addToCart(\'NXS 3-15X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>NXS 5.5-22X</td><td>18 000</td><td>' +
        '<button onclick="addToCart(\'NXS 5.5-22X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>RAZOR 1.0-10X</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'RAZOR 1.0-10X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>RAZOR 1.0-6X</td><td>17 000</td><td>' +
        '<button onclick="addToCart(\'RAZOR 1.0-6X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>S&B SHORT DOT 1-8X</td><td>18 000</td><td>' +
        '<button onclick="addToCart(\'S&B SHORT DOT 1-8X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>S&B SHORT DOT 1-8X + MRDS</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'S&B SHORT DOT 1-8X + MRDS\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>SPECTER DR 1.5-6X</td><td>14 000</td><td>' +
        '<button onclick="addToCart(\'SPECTER DR 1.5-6X\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>US-OPTICS MR10 2.9-8.8X</td><td>18 000</td><td>' +
        '<button onclick="addToCart(\'US-OPTICS MR10 2.9-8.8X\', 1)">Добавить 1 шт</button></td></tr>' +
        '<tr><td>MRDS +</td><td>2000</td><td>' +
        '<button onclick="addToCart(\'MRDS +\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>AIMPOINT T1 +</td><td>1000</td><td>' +
        '<button onclick="addToCart(\'AIMPOINT T1 +\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>ТЕПЛАК НА НЕКОТОРЫЕ ПРИЦЕЛЫ</td><td>ДЛЯ КАЖДОГО ПРИЦЕЛА ОТДЕЛЬНО</td><td>' +
        '<button onclick="addToCart(\'ТЕПЛАК НА НЕКОТОРЫЕ ПРИЦЕЛЫ\', 1)">Добавить 1 шт</button></td></tr>' +

        '</table>';
                    break;
                case 'medicine':
    content = '<h2>Медицина</h2><table>' +
        '<tr><th>Предмет</th><th>Цена за 10 шт $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>Повязка</td><td>1000</td><td>' +
        '<button onclick="addToCart(\'Повязка\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Давящая повязка</td><td>1200</td><td>' +
        '<button onclick="addToCart(\'Давящая повязка\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Тампонирующий бинт</td><td>1100</td><td>' +
        '<button onclick="addToCart(\'Тампонирующий бинт\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Тампонирующий бинь пропитанный целоксом</td><td>1400</td><td>' +
        '<button onclick="addToCart(\'Тампонирующий бинь пропитанный целоксом\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Обезболивающие таблетки</td><td>1500</td><td>' +
        '<button onclick="addToCart(\'Обезболивающие таблетки\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Морфин</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'Морфин\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Норадреналин</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'Норадреналин\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Шины</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'Шины\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Мешки для трупов</td><td>2000</td><td>' +
        '<button onclick="addToCart(\'Мешки для трупов\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Турникет type CAT</td><td>1500</td><td>' +
        '<button onclick="addToCart(\'Турникет type CAT\', 10)">Добавить 10 шт</button></td></tr>' +

        '</table>' +

        '<h2>Физ. раствор, кровь и плазма</h2><table>' +
        '<tr><th>Тип</th><th>Цена за 5 пакетов $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>250 мл крови</td><td>1200</td><td>' +
        '<button onclick="addToCart(\'250 мл крови\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>500 мл крови</td><td>2400</td><td>' +
        '<button onclick="addToCart(\'500 мл крови\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>1000 мл крови</td><td>3600</td><td>' +
        '<button onclick="addToCart(\'1000 мл крови\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>250 мл физ раствора</td><td>1000</td><td>' +
        '<button onclick="addToCart(\'250 мл физ раствора\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>500 мл физ раствора</td><td>2000</td><td>' +
        '<button onclick="addToCart(\'500 мл физ раствора\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>1000 мл физ раствора</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'1000 мл физ раствора\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>250 мл плазмы</td><td>1100</td><td>' +
        '<button onclick="addToCart(\'250 мл плазмы\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>500 мл плазмы</td><td>2200</td><td>' +
        '<button onclick="addToCart(\'500 мл плазмы\', 1)">Добавить 5 пакетов</button></td></tr>' +

        '<tr><td>1000 мл плазмы</td><td>3300</td><td>' +
        '<button onclick="addToCart(\'1000 мл плазмы\', 1)">Добавить пакетов</button></td></tr>' +

        '</table>';
    break;
                case 'ammo':
    content = '<h2>Патроны, Коробы, Обоймы</h2><table>' +
        '<tr><th>Предмет</th><th>Доп информация</th><th>Цена за 10 магазинов, коробов, обойм $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>5.45 30</td><td>7Н22</td><td>1000</td><td>' +
        '<button onclick="addToCart(\'5.45 30\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>5.45 45</td><td>7Н22</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'5.45 45\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>5.45 60</td><td>7Н22</td><td>15 000</td><td>' +
        '<button onclick="addToCart(\'5.45 60\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*39 30</td><td>FMJ</td><td>1000</td><td>' +
        '<button onclick="addToCart(\'7.62*39 30\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*39 40</td><td>FMJ</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'7.62*39 40\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*39 75</td><td>FMJ</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'7.62*39 75\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*39 10</td><td>СП5</td><td>2000</td><td>' +
        '<button onclick="addToCart(\'9*39 10 СП5\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*39 20</td><td>СП5</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'9*39 20 СП5\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*39 10</td><td>СП6</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'9*39 10 СП6\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*39 20</td><td>СП6</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'9*39 20 СП6\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>5.56 30</td><td>M855</td><td>1300</td><td>' +
        '<button onclick="addToCart(\'5.56 30 M855\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>5.56 40</td><td>M855</td><td>8000</td><td>' +
        '<button onclick="addToCart(\'5.56 40 M855\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>5.56 60</td><td>M855A1</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'5.56 60 M855A1\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>.300W (ДЛЯ М2010) 5</td><td>A-MAX</td><td>4000</td><td>' +
        '<button onclick="addToCart(\'.300W (ДЛЯ М2010) 5\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*54 КОРОБ 100</td><td>ЛПС</td><td>10 000</td><td>' +
        '<button onclick="addToCart(\'7.62*54 КОРОБ 100 ЛПС\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*54 КОРОБ 100</td><td>БЗ</td><td>40 000</td><td>' +
        '<button onclick="addToCart(\'7.62*54 КОРОБ 100 БЗ\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*54 КОРОБ 100</td><td>ТРАССЕР</td><td>12 000</td><td>' +
        '<button onclick="addToCart(\'7.62*54 КОРОБ 100 ТРАССЕР\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*54 СВД 10</td><td>7Н1</td><td>6000</td><td>' +
        '<button onclick="addToCart(\'7.62*54 СВД 10 7Н1\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*54 СВД 10</td><td>7Н14</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'7.62*54 СВД 10 7Н14\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>12.7x99</td><td>A-MAX</td><td>13 000</td><td>' +
            '<button onclick="addToCart(\'12.7x99 AMAX\', 10)">Добавить 10 шт</button></td></tr>' +
            
        '<tr><td>12.7x99</td><td>Трассер</td><td>12 000</td><td>' +
            '<button onclick="addToCart(\'12.7x99 Трассер\', 10)">Добавить 10 шт</button></td></tr>' +
            
        '<tr><td>12.7x99</td><td>БЗ</td><td>28 000</td><td>' +
            '<button onclick="addToCart(\'12.7x99 БЗ\', 10)">Добавить 10 шт</button></td></tr>' +
            
        '<tr><td>40MM 6</td><td>HE</td><td>18 000</td><td>' +
        '<button onclick="addToCart(\'40MM 6 HE\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>40MM 6</td><td>HET</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'40MM 6 HET\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>40MM 6</td><td>HEDP</td><td>25 000</td><td>' +
        '<button onclick="addToCart(\'40MM 6 HEDP\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>40MM 6</td><td>LIGHT</td><td>5000</td><td>' +
        '<button onclick="addToCart(\'40MM 6 LIGHT\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>40MM 6</td><td>SMOKE</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'40MM 6 SMOKE\', 10)">Добавить 10 шт</button></td></tr>' +
        '<tr><td>5.7 P90 50</td><td></td><td>4000</td><td>' +
        '<button onclick="addToCart(\'5.7 P90 50\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>M1911 7</td><td></td><td>3000</td><td>' +
        '<button onclick="addToCart(\'M1911 7\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*18 8</td><td></td><td>2000</td><td>' +
        '<button onclick="addToCart(\'9*18 8\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*19 17</td><td></td><td>4000</td><td>' +
        '<button onclick="addToCart(\'9*19 17\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>9*19 20</td><td></td><td>5000</td><td>' +
        '<button onclick="addToCart(\'9*19 20\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>MP7 40</td><td>FMJ</td><td>9000</td><td>' +
        '<button onclick="addToCart(\'MP7 40 FMJ\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>7.62*25 TT</td><td></td><td>3000</td><td>' +
        '<button onclick="addToCart(\'7.62*25 TT\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>.45ACP 6</td><td></td><td>3000</td><td>' +
        '<button onclick="addToCart(\'.45ACP 6\', 10)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>300 BLK</td><td></td><td>3000</td><td>' +
        '<button onclick="addToCart(\'300 BLK\', 10)">Добавить 10 шт</button></td></tr>' +

        '</table>';
    break;
                case 'how_to_pay':
                    content = '<h2>Оплата</h2><table><tr><th>Валюта</th><th>Цена</th></tr><tr><td>Банкноты</td><td>100 $</td></tr><tr><td>Рулон купюр</td><td>1000 $</td></tr><tr><td>Стопка купюр</td><td>10 000 $</td></tr><tr><td>Гора стопок купюр</td><td>60 000$</td></tr></table>';
                    break;
                case 'repair_cars':
                    content = '<h2>Капитальный ремонт техники, а так же составляющие для них. Добавлять вручную в заказе</h2><table><tr><th>Техника</th><th>Цена за ремонт $</th><th>Запасные детали</th><th>Цена за одну деталь $</th></tr><tr><td>Легкая техника</td><td>1000</td><td>Колёса</td><td>200</td></tr><tr><td>Средняя техника(БТР, БМП...)</td><td>3000</td><td>Траки</td><td>300</td></tr><tr><td>Тяжелая техника</td><td>7000</td><td>Точная настройка ГРАДов, НУРСов ...</td><td>1000</td></tr><tr><td>Ремонт вертолётов СССР</td><td>10 000</td><td>Ремонт НАТО вертолётов</td><td>15 000</td></tr><tr><td>Ремонт самолётов СССР</td><td>15 000</td><td>Ремонт НАТО самолётов</td><td>20 000</td></tr></table>';
                    break;
                case 'misc':
    content = '<h2>Обвесы, Ночники, Тепловизоры</h2><table>' +
        '<tr><th>Предмет</th><th>Цена за 1 шт $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>Глушители</td><td>6000</td><td>' +
        '<button onclick="addToCart(\'Глушители\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Пламягаситель</td><td>3000</td><td>' +
        '<button onclick="addToCart(\'Пламягаситель\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Ручка переноса огня</td><td>1000</td><td>' +
        '<button onclick="addToCart(\'Ручка переноса огня\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Сошки</td><td>2000</td><td>' +
        '<button onclick="addToCart(\'Сошки\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>PVS-14</td><td>7000</td><td>' +
        '<button onclick="addToCart(\'PVS-14\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>PVS-31</td><td>15 000</td><td>' +
        '<button onclick="addToCart(\'PVS-31\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>PVS Panoramic</td><td>42 000</td><td>' +
        '<button onclick="addToCart(\'PVS Panoramic\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>PVS-31 + thermal imager</td><td>20 000</td><td>' +
        '<button onclick="addToCart(\'PVS-31 + thermal imager\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>PVS Panoramic + thermal imager</td><td>65 000</td><td>' +
        '<button onclick="addToCart(\'PVS Panoramic + thermal imager\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Dbal</td><td>50 000</td><td>' +
        '<button onclick="addToCart(\'Dbal\', 1)">Добавить 1 шт</button></td></tr>' +

        '</table>';
            break;
                case 'akcija_kurwa':
    content = '<h2>Временные товары</h2><table>' +
        '<tr><th>Предмет</th><th>Цена за 1 шт $</th><th>Добавить в корзину</th></tr>' +

        '<tr><td>Taureq</td><td>28 000</td>' +
        '<td><button onclick="addToCart(\'Taureq\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Кастомные улучшения вооружения</td><td>60 000</td>' +
        '<td><button onclick="addToCart(\'Комплектация Обвесов\', 1)">Добавить 10 шт</button></td></tr>' +

        '<tr><td>Обезопасить периметр</td><td>50 000</td>' +
        '<td><button onclick="addToCart(\'Затяжка\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Little Bird</td><td>40 000</td>' +
        '<td><button onclick="addToCart(\'Bird\', 1)">Добавить 1 шт</button></td></tr>' +


        '<tr><td>Дополнительные укрепленные точки, турели, способы подрыва, заборы</td><td>400 000</td>' +
        '<td><button onclick="addToCart(\'Territoty\', 1)">Добавить 1 шт</button></td></tr>' +

        '<tr><td>Разведданые, Секретный подарок</td><td>40 000</td>' +
        '<td><button onclick="addToCart(\'SECRET BOX from Mainland\', 1)">Добавить 1 шт</button></td></tr>' +

        '</table>';
    break;
        default:
            content = '<h2>Раздел в разработке</h2>';
    }
    document.getElementById("modal-body").innerHTML = content;
    document.getElementById("modal").style.display = 'flex';
}
function addToCart(productName, quantity) {
    if (!priceList[productName]) {
        alert("Ошибка: Товар не найден!");
        return;
    }

    let unitPrice = priceList[productName].unitPrice || 0;
    let bulkPrice = priceList[productName].bulkPrice !== null ? priceList[productName].bulkPrice : unitPrice;

    let bulkQuantity = Math.floor(quantity / 10);
    let remainingQuantity = quantity % 10;
    let totalPrice = (bulkQuantity * bulkPrice * 10) + (remainingQuantity * unitPrice);

    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, quantity });
    }

    saveCart();
    alert(`${productName} добавлено в корзину`);
    updateCartDisplay();
}
function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    if (!cartItemsList) {
        console.error("❌ Ошибка: элемент #cart-items не найден!");
        return;
    }

    cartItemsList.innerHTML = "";
    let totalSum = 0;

    if (!cart || cart.length === 0) {
        cartItemsList.innerHTML = "<p>🛒 Корзина пуста...</p>";
    }

    cart.forEach((item, index) => {
        if (!priceList[item.name]) {
            console.warn(`⚠ Цена для "${item.name}" не найдена!`);
            return;
        }

        let bulkPrice = priceList[item.name]?.bulkPrice !== null ? priceList[item.name].bulkPrice : priceList[item.name]?.unitPrice;
        let unitPrice = priceList[item.name]?.unitPrice || 0;

        let bulkQuantity = Math.floor(item.quantity / 10);
        let remainingQuantity = item.quantity % 10;
        let totalPrice = (bulkQuantity * bulkPrice * 10) + (remainingQuantity * unitPrice);

        item.totalPrice = totalPrice;
        totalSum += totalPrice;

        const li = document.createElement("li");
        li.setAttribute("data-index", index);
        li.innerHTML = `
            ${item.name} (<span class="item-quantity">${item.quantity}</span> шт) – 
            <span class="item-total">${totalPrice.toFixed(2)}</span> $
            <button class="cart-plus">+</button>
            <button class="cart-minus">–</button>
            <button class="cart-remove">×</button>
        `;
        cartItemsList.appendChild(li);

        // Обработчики событий для изменения количества
        li.querySelector(".cart-plus").addEventListener("click", function () {
            item.quantity++;
            saveCart();
            updateCartDisplay();
        });

        li.querySelector(".cart-minus").addEventListener("click", function () {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
            updateCartDisplay();
        });

        li.querySelector(".cart-remove").addEventListener("click", function () {
            cart.splice(index, 1);
            saveCart();
            updateCartDisplay();
        });
    });

    // Обновление кнопки "Корзина"
    const cartButton = document.querySelector(".cart-button");
    if (cartButton) {
        cartButton.textContent = cart.length > 0 
            ? `Корзина (${cart.length} товаров, ${totalSum.toFixed(2)} $)`
            : "Корзина";
    }

    // Обновление итоговой суммы
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        totalPriceElement.textContent = `Общая сумма: ${totalSum.toFixed(2)} $`;
    }
}
function openCart() {
    let cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        cartModal.style.display = "block";
        updateCartDisplay();
    }
}
function closeCart() {
    let cartModal = document.getElementById("cart-modal");
    if (cartModal) {
        cartModal.style.display = "none";
    }
}
function closeModal() {
    let modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}
document.addEventListener("click", function (event) {
    let modal = document.getElementById("modal");
    if (modal && event.target === modal) {
        closeModal();
    }
});
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartDisplay();
}
function sendOrder() {
    if (cart.length === 0) {
        alert("❌ Ваша корзина пуста!");
        return;
    }

    let orderNumber = `ORD-${Date.now()}`;
    let commentElement = document.getElementById("order-comment");
    let comment = commentElement ? commentElement.value : "Без комментария";

    let formattedItems = cart.map(item => {
        if (!priceList[item.name]) {
            console.warn(`⚠ Ошибка: Товар "${item.name}" не найден в priceList!`);
            return null;
        }

        let unitPrice = priceList[item.name].unitPrice || 0;
        let bulkPrice = priceList[item.name].bulkPrice !== null ? priceList[item.name].bulkPrice : unitPrice;

        let bulkQuantity = Math.floor(item.quantity / 10);
        let remainingQuantity = item.quantity % 10;

        let totalPrice = (bulkQuantity * bulkPrice * 10) + (remainingQuantity * unitPrice);

        return {
            name: item.name,
            quantity: item.quantity,
            pricePerUnit: unitPrice,
            totalPrice: totalPrice
        };
    }).filter(item => item !== null);

    let totalOrderPrice = formattedItems.reduce((sum, item) => sum + item.totalPrice, 0);

    let order = {
        orderNumber: orderNumber,
        items: formattedItems,
        totalPrice: totalOrderPrice,
        comment: comment
    };

    console.log("📌 Отправляем заказ на сервер:", order);

    fetch("https://pmk-eagles.shop/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ Заказ успешно отправлен:", data);
        alert("✅ Заказ отправлен!");

        if (socket) {
            socket.emit("newOrder", order);
            console.log("📡 Заказ отправлен через WebSocket");
        }

        clearCart();
        window.location.href = "orders.html";
    })
    .catch(error => {
        console.error("❌ Ошибка при отправке заказа:", error);
        alert("❌ Ошибка при отправке заказа, попробуйте ещё раз.");
    });
}
document.addEventListener("DOMContentLoaded", function () {
    let sendOrderBtn = document.querySelector(".snapshot");

    if (sendOrderBtn) {
        sendOrderBtn.addEventListener("click", sendOrder);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let sendOrderBtn = document.querySelector(".snapshot");

    if (sendOrderBtn) {
        sendOrderBtn.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("❌ Ваша корзина пуста!");
                return;
            }

            let orderNumber = `ORD-${Date.now()}`;
            let comment = document.getElementById("order-comment").value || "Без комментария";

            let order = {
                orderNumber: orderNumber,
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    totalPrice: item.quantity * (priceList[item.name]?.unitPrice || 0)
                })),
                totalPrice: cart.reduce((sum, item) => sum + (item.quantity * (priceList[item.name]?.unitPrice || 0)), 0),
                comment: comment
            };

            let orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")) : [];
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            clearCart();
            window.location.href = "orders.html";
        });
    }
});
fetch("https://pmk-eagles.shop/api/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
})
.then(response => response.json())
.then(data => {
    console.log("Заказ отправлен", data);
    clearCart();
    window.location.href = "orders.html";
});

