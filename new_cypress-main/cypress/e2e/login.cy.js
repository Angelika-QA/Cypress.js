import * as data from "../helpers/default_data.json";

import * as main_page from "../locators/main_page.json";

import * as result_page from "../locators/result_page.json";

import * as recovery_page from "../locators/recovery_password_page.json";

describe("Проверка авторизации", function () {
  beforeEach("Начало теста", function () {
    cy.visit("/"); //зашли на сайт
    cy.get(main_page.fogot_pass_btn).should(
      "have.css",
      "color",
      "rgb(0, 85, 152)",
    ); //проверяю цвет кнопки Восстановить пароль
  });

  afterEach("Конец теста", function () {
    cy.get(result_page.close).should("be.visible"); //кнопка есть и она видна пользователю
  });

  it("Верный логин и верный пароль", function () {
    cy.get(main_page.email).type(data.login); //ввели верный логин
    cy.get(main_page.password).type(data.password); //ввели верный пароль
    cy.get(main_page.login_button).click(); //нажала Войти

    cy.get(result_page.title).contains("Авторизация прошла успешно"); // проверка что после авт. вижу текст
    cy.get(result_page.title).should("be.visible"); //текст виден пользователю
  });

  it("Верный логин и неверный пароль", function () {
    cy.get(main_page.email).type(data.login); //ввели верный логин
    cy.get(main_page.password).type("qa_one_love7"); //ввели неверный пароль
    cy.get(main_page.login_button).click(); //нажала Войти

    cy.get(result_page.title).contains("Такого логина или пароля нет"); // проверка что после авт. вижу текст
    cy.get(result_page.title).should("be.visible"); //текст виден пользователю
  });

  it("Проверка что в логине есть @", function () {
    cy.get(main_page.email).type("germandolnikov.ru"); //ввели логин ,без @
    cy.get(main_page.password).type(data.password); //ввели верный пароль
    cy.get(main_page.login_button).click(); //нажала Войти

    cy.get(result_page.title).contains("Нужно исправить проблему валидации"); // проверка что после авт. вижу текст
    cy.get(result_page.title).should("be.visible"); //текст виден пользователю
  });

  it("Проверка восстановления пароля", function () {
    cy.get(main_page.fogot_pass_btn).click(); //нажала Восстановить пароль
    cy.get(recovery_page.email).type(data.login); // ввела почту для восстановления
    cy.get(recovery_page.send_button).click(); // нажала отправить код

    cy.get(result_page.title).contains("Успешно отправили пароль на e-mail"); // проверка на совпадение текст
    cy.get(result_page.title).should("be.visible"); //текст виден пользователю
  });

  it("Неверный логин и верный пароль", function () {
    cy.get(main_page.email).type("sdjhfskj@gmail.com"); //ввели неверный логин
    cy.get(main_page.password).type(data.password); //ввели верный пароль
    cy.get(main_page.login_button).click(); //нажала Войти

    cy.get(result_page.title).contains("Такого логина или пароля нет"); // проверка что после авт. вижу текст
    cy.get(result_page.title).should("be.visible"); //текст виден пользователю
  });

  it("Строчные буквы в логине и верный пароль", function () {
    cy.get(main_page.email).type("GerMan@Dolnikov.ru"); //ввели неверный логин со строчными буквами
    cy.get(main_page.password).type(data.password); //ввели верный пароль
    cy.get(main_page.login_button).click(); //нажала Войти

    cy.get(result_page.title).contains("Такого логина или пароля нет"); // проверка что после авт. вижу текст
    cy.get(result_page.title).should("be.visible"); //текст виден пользователю
  });
});

// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
// план
// найти поле логин и ввести правильный логин
// найти поле пароль и ввести правильный пароль
// найти кнопку Войти и нажать на нее
// проверить, что авторизыция прошла успешнo
