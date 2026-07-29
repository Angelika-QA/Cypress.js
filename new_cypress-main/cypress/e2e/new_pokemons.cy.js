import * as data from "../helpers/default_data.json";

describe("Покупка нового аватара для тренера", function () {
  it("e2e тест на покупку нового аватара для тренера", function () {
    cy.visit("https://pokemonbattle.ru/"); // перейти на сайт https://pokemonbattle.ru/
    cy.get("#k_email").type(data.login1); //найти поле логин и ввести логин
    cy.get("#k_password").type(data.password1); //найти поле пароль и ввести пароль
    cy.get(".MuiButton-root").click(); //найти внопку войти и нажать на нее

    cy.get(".header_card_trainer").click(); //найти кнопку моего тренера и нажать на нее
    cy.get('[data-qa="shop"]').click(); // нажимаем кнопку Смена аватара

    cy.get(".available > button").first().click(); // кликаем Купить у первого доступного аватара

    cy.wait(3000);

    cy.get(".payment_receipt_open_button").should("be.visible"); //найти кнопку стоимости покупки, цена должна быть видима покупателю
    cy.get(
      ".payment_form_card_form > :nth-child(2) > .style_1_base_input",
    ).type(data.card_number); //найти поле номер карты и ввести номер

    cy.get(":nth-child(1) > .style_1_base_input").type(data.Card_date_expire); //найти поле срок и ввести его
    cy.get(
      ".payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input",
    ).type(data.CVV); //найти поле код и ввести
    cy.get(".payment_form_card_form_input_last > .style_1_base_input").type(
      data.CardName,
    ); //найти поле имя и ввести
    cy.get(
      ".style_1_base_button_payment_body > .style_1_base_button_payment",
    ).click(); //найти кнопку оплатить и нажать
    cy.get(".style_1_base_input").type(data.Code);
    cy.get(
      ".style_1_base_button_payment_body > .style_1_base_button_payment",
    ).click();
    cy.get(".payment_receipt_open_button").should("be.visible"); //стоимость покупки должна быть видима
    cy.get(".payment_status_top_title").contains("Покупка прошла успешно"); //проверяем наличие и видимость сообщения об успешной покупке
  });
});

//найти поле логин и ввести логин
//найти поле пароль и ввести пароль
//найти внопку войти и нажать на нее
//найти кнопку моего тренера и нажать на нее
//найти кнопку смена аватара и нажать на нее
//выбрать аватар с классом available и нажать купить
//найти кнопку стоимости покупки, цена должна быть видима покупателю
//найти поле номер карты и ввести номер
//найти поле срок и ввести его
//найти поле код и ввести
//найти поле имя и ввести
//найти кнопку оплатить и нажать
//найти поле код из пуша и ввести
//найти кнопку оплатить и нажать
//проверяем наличие и видимость сообщения об успешной покупке
