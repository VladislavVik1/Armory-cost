document.addEventListener("DOMContentLoaded", function () {
    const map = document.getElementById("map");
    let zoomed = false;
    let offsetX = 0;
    let offsetY = 0;
    let startX, startY;
    let scale = 3;

    map.addEventListener("click", function (event) {
        const rect = map.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (!zoomed) {
            offsetX = (rect.width / 2 - clickX) * (scale - 1);
            offsetY = (rect.height / 2 - clickY) * (scale - 1);
            
            map.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
            map.style.transition = "transform 0.3s ease-in-out";
            zoomed = true;
        } else {
            map.style.transform = "translate(0, 0) scale(1)";
            zoomed = false;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modal = document.getElementById("modal");
    const fileButtons = document.querySelectorAll(".file-btn");

    const textModal = document.getElementById("textModal");
    const closeTextModalBtn = document.getElementById("closeTextModal");
    const modalText = document.getElementById("modal-text");

    // Открытие основного модального окна
    openModalBtn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "flex";
    });

    // Закрытие основного модального окна
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Закрытие при клике вне модального окна
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === textModal) {
            textModal.style.display = "none";
        }
    });

    // Открытие второго модального окна с текстом
    fileButtons.forEach(button => {
        button.addEventListener("click", function () {
            const fileName = this.getAttribute("data-file");
            openTextModal(fileName);
        });
    });

    // Закрытие второго модального окна
    closeTextModalBtn.addEventListener("click", function () {
        textModal.style.display = "none";
    });

    // Функция открытия окна с текстом
    function openTextModal(file) {
        modal.style.display = "none"; // Закрываем первое окно

        const texts = {
            file1: "Когда ЧВК Eagles прибыли в Колумбию, контекст был сложным, но именно в таких условиях они чувствовали себя как рыбы в воде. В стране бушевали десятки вооруженных группировок, и каждая из них преследовала свои цели — от наркокартелей до идеологических войск, стремящихся продвигать свои мракобесные идеи. Однако Eagles не были просто наемниками. Они пришли с амбициями гораздо более серьезными — контролировать ситуацию, подчинить себе ключевые маршруты и ресурсы, превращая каждый шаг в стратегическое заявление. <br> Один из первых контрактов, который они выполнили, был с Королевской гвардией, ответственными за обеспечение безопасности важного конвоя, перевозящего стратегическое оборудование. Как только конвой начал свой путь, все шло по плану, но вскоре они столкнулись с группировкой «Живой Север». Внезапная засада со стороны противника привела к быстрой и жестокой встрече — противник был уничтожен, но на ходу была подорвана машина с техническим снаряжением Королевской гвардии. Экипаж был уничтожен, а единственный выживший — пленный, неуклюже шевеля языком, называет название своей группировки. Но для Eagles это не было чем-то сверхважным. Важно было другое — они забрали все необходимые данные и продолжили свою работу.<br>  Особое внимание стоит уделить тому, как они забрали Автомат  и «Муху» —Вскоре выяснилось, что для самой гвардии это был не просто инцидент — потеря этого имущества  оказалась болезненным ударом. Но для Eagles это была лишь дополнительная компенсация за выполненную работу. Их не интересовали идеалы — они ценили лишь деньги и успех в деле. <br> Сделав свое дело, Eagles не задерживались в этом районе надолго. Они быстро покинули место событий и отправились на выполнение следующего контракта, на этот раз с группировкой, известной как «Красные Волки». На этот раз они поставили задачу — подрыв склада с боеприпасами, важнейшего для логистики врага. Вечер принес взрыв, а спустя несколько минут уже не было ни склада, ни двух старых танков, стоявших в укрытии, ни пехоты, что пыталась на них напасть. Все было уничтожено, и огромная сумма за выполненную операцию была немедленно переведена на счет Eagles. <br> Вернувшись на базу, они вновь стали объектом обсуждения среди всех группировок острова. Новости о их методах работы быстро разнеслись — Eagles не из тех, кто идет на компромиссы. Но все понимали, что для них это лишь начало. Множество контрактов, множество задач, но одна цель — деньги. Они не воевали за идеалы, не за правду и справедливость. Они воевали за собственную выгоду и ради того, чтобы быть сильнейшими в этом хаосе. «Каждый день — новая миссия. Каждый контракт — новый вызов», — подметил один из командиров Eagles, с холодной решимостью, которая скрывала за собой чёткое понимание того, что впереди будет только больше работы.",
            file2: "<h1>ЧВК Орлы Двое суток в огне</h1><br>Орлы не привыкли к легким задачам, но этот день оказался особенно насыщенным. Они едва успели разгрузить припасы, как поступил экстренный приказ: зачистить блиндаж бойцов ЧВК Вагнер, на которых внезапно напал картель.<br> Главная цель — ноутбук с важными данными, который нужно было доставить на базу любой ценой. <br> Пятеро бойцов двинулись к месту операции. Всё шло по плану, пока Гриф не зацепил растяжку. Взрыв отбросил его назад, и он потерял сознание. Пришлось срочно менять тактику: пока одни эвакуировали раненого, другие обеспечили прикрытие. Несмотря на хаос, ноутбук был найден и доставлен на базу. Гриф пришел в себя уже в санитарной части, отделавшись тяжелыми ранениями.<br> Тем временем другая группа из шести человек вышла на встречу с группировкой Тайный Порт для передачи им некоего вещества. Однако сделка быстро превратилась в бойню. Завязалась перестрелка, а затем противник подтянул авиацию — над районом завис Ми-8, который сбросил на них бомбы <b>ФАБ-250</b> Взрывом ранило почти всех. В критический момент на помощь пришли четверо бойцов Армии, сумевшие привести одного из Орлов в чувство и организовать эвакуацию пострадавших. <br> Вечером, перевязав раны и приведя себя в порядок, Орлы приняли новый контракт. Им предстояло зачистить город, действуя под прикрытием группировки Живой Север. Операция шла гладко, пока их не засекли бойцы Красных Волков. Враг атаковал жестко, без пощады, но Орлы ответили тем же. Бой длился долго, улицы были охвачены огнем, но в конечном итоге Красные Волки были уничтожены. Однако теперь Орлами заинтересовалась ЧВК Вагнер, начав собирать на них досье. Закончив сражение, бойцы вернулись на базу, исчерпанные, но довольные — за все три операции они заработали <b>250 000</b> долларов.<br> Следующий день принес новую задачу. Операция под кодовым названием Новогодняя ёлка, известная также как Тихий Рубикон, требовала уничтожения ключевого моста в районе города Овейас. <b>С 22:00 до 4:00</b> по нему шла колонна техники и пехоты противника. <br> Ночью пятеро бойцов выдвинулись к цели. На мосту стояла колонна противника, но движение замерло — солдаты расслабились, спрыгнули с техники и просто отдыхали, уверенные в своей безопасности. Орлы молча наблюдали за ними через приборы ночного видения, двигаясь в тени. Они незаметно заминировали конструкцию и без шума отошли на безопасное расстояние. Когда всё было готово, раздался мощный взрыв — мост рухнул, похоронив под обломками БТР, два джипа с пулеметами ДШКМ и целый отряд пехоты. Однако враг не собирался отпускать их безнаказанно: вспыхнули сигнальные ракеты, и по Омрла открыли огонь. Бойцы бросились к подготовленным лодкам и, несмотря на шквальный обстрел, сумели уйти без потерь.<br> По возвращении на базу одного из членов отряда вызвали на разговор с начальством. Беседа вышла напряженной, а пистолет в руках офицера лишь усилил эффект. Спустя некоторое время дверь открылась, и боец вышел из комнаты, измученный, с ранами в области ног. Он едва передвигался, его шаги были неуверенными — возможно, нога была сломана или сильно вывихнута. О чем шла речь — знали только те, кто присутствовал в комнате.<br> За двое суток ЧВК Орлы выполнили четыре сложнейшие операции и заработали в общей сложности <b>323 000</b> долларов. Но все понимали: расслабляться нельзя. Завтра могло принести новые вызовы, а значит, оружие должно быть в порядке, а нервы — как сталь, непоколебимы.",
            file3: "Доклад о боевой операции ЧВК Орлы <br> Дата:<b>19.05.2024</b> <br> Командир операции: <b>Azune</b> <br> Район проведения: Проезд колонны Наркокартеля<br>После подписания контракта Гоп стоп бойцы ЧВК Орлы получили задание провести рейд в районе предполагаемого прохождения колонны наркокартеля. Главной целью операции являлась дезорганизация вражеской логистики, уничтожение техники противника и ликвидация боевого сопровождения. Время атаки было выбрано не самым удобным, но дневная засада позволила нанести внезапный и разрушительный удар по противнику. <br> Группа бойцов под командованием Quazar выдвинулась на заранее подготовленные позиции. Было выбрано удобное место для засады — узкий проезд, которое не позволяло технике противника легко маневрировать и давало нам тактическое преимущество. Группа подготовила огневые точки для ведения перекрёстного огня. <br>Согласно разведданным, колонна противника состояла из:<br> 1 основного боевого танка;<br>1 БМП, обеспечивающей огневую поддержку;<br> 2 грузовиков с вооруженной пехотой;<br>1 транспорта с грузом (предположительно наркотики и боеприпасы). <br> В назначенное время конвой противника не вошёл в зону поражения. Первый же контакт открыл передний УАЗ Головного дозора, заблокировав дальнейшее движение колонны. Оперативно открывшийся перекрёстный огонь с флангов уничтожил часть боевиков . Танк противника начал срочным образом вместе с поддержкой БМП подавлять позиции ЧВК <br> Несмотря на эффект неожиданности, противник оказал ожесточённое сопротивление. Расчёт ПТРК успешно поразил БМП и Танк, что вызвало замешательство среди оставшихся сил противника.<br> После 15 минут интенсивного боя колонна наркокартеля была полностью разгромлена. Танк уничтожен, БМП выведена из строя, личный состав противника понёс тяжёлые потери. Транспорт с грузом был поражён и уничтожен.<br>Достигнутые цели:<br>Уничтожена техника противника (Танк, БМП, грузовики);<br> Ликвидировано порядка 15-20 боевиков наркокартеля; <br>Нарушены пути снабжения противника; <br> Груз с контрабандой уничтожен.<br> Собственные потери: <br> 4 бойца получили тяжёлые ранения и были эвакуированы в медицинское расположение базы, где проходят реабилитацию.<br>Некоторое оборудование получило повреждения, но оперативно восстановлено.<br> Заключение<br> Операция Гоп стоп принесла успех, несмотря на серьёзное сопротивление противника. Бойцы ЧВК Орлы продемонстрировали высокую боеспособность, оперативность и умение действовать в сложных условиях. Сейчас тяжелораненые проходят лечение, а основные силы возвращаются к выполнению новых задач.<br> Командование выражает благодарность всем участникам операции за проявленную храбрость и профессионализм. Враг получил серьёзный удар, и теперь он будет действовать осторожнее, зная, что ЧВК Орлы готовы нанести молниеносный и беспощадный удар в любой момент."
        };

        modalText.innerHTML = `<p>${texts[file]}</p>`;
        textModal.style.display = "flex";
    }
});
