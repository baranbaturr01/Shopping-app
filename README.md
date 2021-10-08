# Shopping-app

## Start Docker

```
docker-compose up
```

## Start nodemon

```
nodemon
```

- ## Projenin Amacı
- Online olarak bir Alışveriş Uygulaması

## End-Points

- ### Admin/Register
    - İSTEK:
        - POST: `BASE_URL/case/admin/register`
    - Uygulama Yöneti kayıt end-pointidir
    - `username` ve `password` ile kayıt yaptırılır ve geriye `success:true` dönecektir
    - Admin kullanıcı: Customer ekleyebilir,customer listeleyebilir ,ürün ekleyebilir,ürün listeleyebilir ,ürün
      güncelleyebilir.
- ### Admin/login
    - İSTEK:
        - POST: `localhost:1337/case/admin/login`
    - Kayıt olan Adminin Giriş end-pointidir
    - Gerekli Parametreler
        - username` ve `password `
    - Geriye `token:''eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ0b2tlbl90eXBlIjoiQURNSU4iLCJpYXQiOjE2MzM2NzE4ODV9.KQw5dhriqFaVEz7_RVFKL69WoD8tiz8IcPsqksjNYgs' `
  gibi bir token dönecektir
    - login olan admin yetkileri yukarıda bahsedilmiştir

- ### Customer/Register
    - İSTEK:
        - POST: `BASE_URL/case/customer/register`
    - Gerekli Parametreler
        - Body:
            - `first_name`,`last_name`, `email`,`password`
        - Header:
            - `X-Token`: `//Admin Token`

    - Admin tarafından sisteme kayıt edilen müşteri end-pointidir
    - Geriye `success:true` döner
- ### Get-Customers
    - İSTEK :
        - GET: `BASE_URL/case/get-customers`,
    - Gerekli Parametreler
        - Header:
            - `X-Token`
              -Kayıtlı müşterilerin listelenmesi için gerekli end-pointtir

- ### Customer/Login
    - İSTEK :
        - POST : `BASE_URL/case/customer/login`
    - Gerekli Parametreler
        - Body:
            - `emai `, `password`

    - Müşterinin login olduğu end-pointtir geriye bir adet token dönecektir bu customer token olacaktır
- ### Order/Detail
    - İSTEK :
        - POST: `BASE_URL/case/oder-detail`
    - Gerekli Parametreler 
      - Body :
        - `oder_id`
      -Header :
        - Customer login ile oluşan token : `X-Token`
      
    - Sipariş vermiş müsterinin sipariş detaylarına ulaşmak için geliştirlen en-pointtir
    - Geriye müşteri bilgini ,ürün blgisini  içereren bir response dönecektir

- ### Add/Product
    - İSTEK :
      - POST : `BASE_URL/case/add-product`
    - Gerekli Parametreler
      - Body :
        - `title`,`list_price`,`sell_price`,`description`
      - Header: 
        - `X-Token` `//admin token`
        
    - Admin Tarafında sisteme ürün ekleme end-pointidir

- ### Get/Products
    - İSTEK :
      - GET : `BASE_URL/case/get-products`
    - Gerekli Parametreler :
      - Header: 
        - `X-Token` `//admin token`
        
    - Sisteme kayıtlı ürünlerin listelendiği end-pointtir

- ### Update/Product
  - İSTEK :
    - POST : `BASE_URL/case/update-product`
  - Gerekli Parametreler:
    - body :
      - `product_id` bu alan boş geçilemez ancak güncellenmek istenen diğer alanlardan (ex: title sell_price vs) istenilen alan parametre olarak body e eklenip istek atılabilir
    - header :
      - `X-Token ` `//admin-token`
  - Ürün Güncellemek için kullanıla end-pointtir id ve token gönderilmesi zorunlu alanlardır

- ### Make/Order
  - İSTEK : 
    - POST : `BASE_URL/case/make-order`
  - Gerekli Parametreler : 
    - Body : `
      products": [
      {
      "id": 1,
      "quantity": 10
      }
      ]`
    - Header :
      - `X-Token: ` `//Customer Token`
  
  - Login olan kullanıcı elindeki token ile birlikte make-order end pointine product id  ve quantity bilgisi ile birden fazla product_id ve quantity eklenecvek şekilde sipariş oluşturabilir

- ### Get/Customer/Orders
    - İSTEK :
      - GET : `BASE_URL/case/get-customer-orders`
    - Gerekli Parametreler 
      - header : `X-Token` `//CUSTOMER TOKEN`
    
    - Müşterinin tüm siparişlerinin listelendiği end-pointtir
  

## Önemli Notlar

- Bu Projede Veritabanı için PostgreSql kullanıldı
- Token kontrolleri için bir adet middleware yazıldı
  - dosyalama yapısı :
    - source 
      - config
      - controllers
      - db
      - middleware
      - models
      - routes
      - services
      - utils
şeklindedir. 
    
- config dosyası içerisinde veritabanı baplantıları  ve enums benzeri işlevleri gören dosyalar kullandım
- controllers da ilgili end-pointler için hazırlanmış controller yapısıdır
- db dosyasında veritabanı bağlantısı sağlandı
- middleware dosyasında token için gerekli validasyon yapıldı
- models dosyasında veritabanı tablolarımın modelleri bulunuyor
- routes içerisinde rotalarım bulunuyor
- services içerisinde yine token validayonu için kullandığım fonksiyonlar bulunuyor
- Utils dosyası yardımcı araçlarım var mesela JWTDecode gibi

- ### POSTMAN COLLECTION LINK
- https://www.postman.com/collections/e5658f832d24513dafb0