import * as data from "../helpers/default_data.json";

describe("Покупка нового аватара для тренера", function () {
  it("e2e тест на покупку нового аватара для тренера", function () {
    cy.visit("https://pokemonbattle.ru/"); // перейти на сайт https://pokemonbattle.ru/
    cy.get("#k_email").type(data.login1); // вводим логин
    cy.get("#k_password").type(data.password1); // вводим пароль
    cy.get(".MuiButton-root").click(); // нажимаем кнопку Подтвердить
    cy.get("body").should("be.visible");

    cy.get(".header_card_trainer").click(); // Клик в шапке на аву тренера
    cy.get('[data-qa="shop"]').click(); // нажимаем кнопку Смена аватара

    cy.get(".available > button").first().click(); // кликаем Купить у первого доступного аватара
    cy.get(
      ".payment_form_card_form > :nth-child(2) > .style_1_base_input",
    ).type("4620869113632996"); // вводим номер карты

    cy.wait(3000);

    cy.get(":nth-child(1) > .style_1_base_input").type("12/27"); // вводим срок действия карты
    cy.get(
      ".payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input",
    ).type("125"); // вводим CVV карты
    cy.get(".payment_form_card_form_input_last > .style_1_base_input").type(
      data.name,
    ); // вводим имя владельца действия карты
    cy.get(
      ".style_1_base_button_payment_body > .style_1_base_button_payment",
    ).click(); // нажимаем кнопку Оплатить

    cy.get(".payment_page_content").should("be.visible");
    cy.get(".style_1_base_input").type("56456"); // вводим код подтверждения СМС

    cy.get(
      ".style_1_base_button_payment_body > .style_1_base_button_payment",
    ).click(); // нажимаем кнопку Оплатить
    cy.get(".payment_page_content").should("be.visible");
    cy.get(".payment_form_card_form").contains("Покупка прошла успешно");
  }); // проверяем наличие и видимость сообщения об успешной покупке
});
