const chai = require('chai');
const chaiHttp = require('chai-http');
const conn = require('../dbtest');
const app = require('../app');
const cpcpackagesModel = require('../app/api/v1.0/models/cpcpackage_model');
const environment = require('../environments/environment');
const config = require('config');

const vapi = environment.v1;

chai.use(chaiHttp);
chai.should();

var token = config.get('token')

describe("### CPC Package ###", () =>
{
    before(done =>
    {
        conn.connectTest().then(() => done()).catch(done);
        insertCpcPackage()
    });

    after(done =>
    {
        conn.close().then(() => done()).catch(done);
    });

    var data

    describe("Get /vdo-packages", () =>
    {
        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });
        it("( 400 Bad Request sort ) ?sort=productId", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=productId")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('Bad Request sort')
                    done();
                });
        });
        it("( 400 Bad Request sort productIds_ASC ) ?sort=productIds_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=productIds_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(400)
                    res.body.should.have.property('error').property('code').to.equal(400)
                    res.body.should.have.property('error').property('message').to.equal('Bad Request sort productIds')
                    done();
                });
        });
        it("( 404 Not Found ) ?productId=123456798", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?productId=123456798")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(404)
                    res.body.should.have.property('error').property('code').to.equal(404)
                    res.body.should.have.property('error').property('message').to.equal('Not Found')
                    done();
                });
        });
        it("( Check SuccessCount ) ", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    res.body.should.have.property('count').to.above(0)
                    done();
                });
        });
        it("( Find All )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    data = res.body.data[1]
                    done();
                });
        });
        it("( Find By ProductId ) ?productId=12345679", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?productId=" + data.productId)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By type ) ?type=simple", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?type=" + data.type)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By subType ) ?subType=package", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?subType=" + data.subType)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By name ) ?name=PLAY MOVIES Full HD free 1m_monthly_Mass *678*17%23", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?name=" + data.name)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By canSell ) ?canSell=false", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?canSell=" + data.canSell)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By price ) ?price=199", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?price=" + data.price)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By allowNtype ) ?allowNtype=prepaid,postpaid", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?allowNtype=" + data.attributesKv.allowNtype.join(','))
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By custNtypes ) ?custNtypes=3BO,3PO,3BE", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?custNtypes=3BO,3PO,3BE")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By custNtypes and custNtypesName ) ?custNtypes=3BO,3PO,3BE&custNtypesName=NG_Lady,99B", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?custNtypes=3BO,3PO,3BE&custNtypesName=NG_Lady,99B")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By custNtypes and custNtypesCode ) ?custNtypes=3BO,3PO,3BE&custNtypesCode=P18053082,P18053012", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?custNtypes=3BO,3PO,3BE&custNtypesCode=P18053082,P18053012")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By custNtypesName ) ?custNtypesName=NG_Lady,99B", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?custNtypesName=NG_Lady,99B")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By custNtypesCode ) ?custNtypesCode=P18053082,P18053012", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?custNtypesCode=P18053082,P18053012")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Find By all )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=canSell_DESC&canSell=false&productId=12345679&type=simple&subType=package&name=PLAY MOVIES Full HD free 1m_monthly_Mass *678*17#&allowNtype=prepaid,postpaid&custNtypesKey=3be,3bo,3po&custNtypesName=NG_Lady,99B&custNtypesCode=P18053082,P18053012&offset=0&limit=3")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By productId ) ?sort=productId_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=productId_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By type ) ?sort=type_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=type_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By type ) ?sort=type_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=type_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By subType ) ?sort=subType_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=subType_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By name ) ?sort=name_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=name_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By price ) ?sort=price_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=price_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
        it("( Sort By canSell ) ?sort=canSell_ASC", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages?sort=canSell_ASC")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('array').length.above(0)
                    done();
                });
        });
    })

    describe("Get /vdo-packages/:id", () =>
    {
        it("( 401 Unauthorized )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages")
                .end((err, res) =>
                {
                    res.should.have.status(401)
                    res.body.should.have.property('error').property('code').to.equal(401)
                    done();
                });
        });
        it("( Code 500 )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages/123456")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(500)
                    res.body.should.have.property('error').property('code').to.equal(500)
                    done();
                });
        });
        it("( 404 Not Found )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages/5da97f8846755d5ec5ef4001")
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(404)
                    res.body.should.have.property('error').property('code').to.equal(404)
                    done();
                });
        });
        it("( FindById )", (done) =>
        {
            chai.request(app)
                .get(vapi + "/vdo-packages/" + data._id)
                .set("Authorization", "Bearer " + token)
                .end((err, res) =>
                {
                    res.should.have.status(200)
                    res.body.should.have.property('data').be.a('object')
                    done();
                });
        });
    })
});

function insertCpcPackage()
{
    cpcpackagesModel.insertMany([{
        product_id: 12345679,
        type: 'simple',
        subtype: 'package',
        name: 'PLAY MOVIES Full HD free 1m_monthly_Mass *678*17#',
        images: 'images',
        price: '199',
        thumbnail: 'thumbnail',
        can_sell: false,
        groupedproducts: [
            {
                "product_id": 12345679
            },
            {
                "product_id": 12345680
            }
        ],
        description: [
            {
                "TH": "description_th"
            },
            {
                "EN": "description_en"
            }
        ],
        attributeskv: {
            "CUSTOMER_N_3BO": "promotion_name|NG_Lady_99B_12M BOS|promotion_code|P18053082",
            "CUSTOMER_N_3PO": "promotion_name|NG_Lady_99B_12M|promotion_code|P18053012",
            "CUSTOMER_N_3BE": "promotion_name|NG Lady 99B Monthly|promotion_code|P18053093",
            "CUSTOMER_N_3PE": "promotion_name|NG Lady 99B Monthly|feature_code|7400130",
            "CUSTOMER_N_IPE": "promotion_name|INS_NG Lady 99B Monthly|promotion_code|P18053022",
            "CUSTOMER_N_NONAIS": "promotion_name|INS_NF NG PLAY SERIES 119B 1Month",
            "CUSTOMER_N_3CO": "promotion_code|P18105525",
            "CUSTOMER_N_3HO": "promotion_code|P18105525",
            "CUSTOMER_N_2CE": "promotion_code|P18105525",
            "CUSTOMER_N_2CO": "promotion_code|P18105525",
            "CUSTOMER_N_3CE": "promotion_code|P18105525",
            "CUSTOMER_N_BCO": "promotion_code|P18105525",
            "CUSTOMER_N_CBE": "promotion_code|P18105525",
            "CUSTOMER_N_IHO": "promotion_code|P18105525",
            "CUSTOMER_N_IPC": "promotion_code|P18105525",
            "CUSTOMER_N_FBO": "promotion_name|NGB_Platinum Full HD_599B 12M|promotion_code|P17068790",
            "CUSTOMER_N_IPO": "",
            "CUSTOMER_N_CPE": "promotion_name|NG HBO Full HD 199Baht Monthly|feature_code|7400095",
            "CUSTOMER_N_CPO": "",
            "CUSTOMER_N_RPE": "",
            "CUSTOMER_N_RPO": "",
            "customer_n_non": "",
            "imagemob": "",
            "imagestb": "",
            "PRODUCT_CODE_3BO": "",
            "PRODUCT_CODE_3PO": "",
            "PRODUCT_CODE_3BE": "",
            "PRODUCT_CODE_3PE": "",
            "PRODUCT_CODE_IPE": "",
            "PRODUCT_CODE": "",
            "tier": "",
            "ETK_FIX_NAME": "",
            "ACCESS_NUMBER": "",
            "ALLOW_NTYPE": "PREPAID|POSTPAID",
            "COMMERCIAL_NAME_TH": "PLAY PREMIUM Free 12Months",
            "COMMERCIAL_NAME_EN": "PLAY PREMIUM Free 12Months",
            "packtype": "",
            "LINK_REGISTER": "",
            "CANCEL_ACCESS_NUMBER": "",
            "LINK_CANCEL": "",
            "TERM_AND_CONDITION_EN": "",
            "TERM_AND_CONDITION_TH": "",
            "PACKAGE_GROUP": "PLAY PREMIUM",
            "VIMMI_PRODUCT_ID": "3005230049010000018,3005230049010000020,3005230049010000015,3005230049010000016,",
            "PACKAGE_VALIDITY_UNIT": "",
            "SUPPORT_PLATFORM": "",
            "FREE": "12",
            "PRICE_INCLUDE_VAT_BAHT": "",
            "SELL_IN_V_ACCOUNT": "N",
            "CHARGE": ""
        }
    },
    {
        product_id: 12345888,
        type: "",
        subtype: "",
        name: "",
        images: "",
        price: "",
        thumbnail: "",
        can_sell: false,
        groupedproducts: [],
        description: [],
        attributeskv: {
            "CUSTOMER_N_3BO": "",
            "CUSTOMER_N_3PO": "",
            "CUSTOMER_N_3BE": "",
            "CUSTOMER_N_3PE": "",
            "CUSTOMER_N_IPE": "",
            "CUSTOMER_N_NONAIS": "",
            "CUSTOMER_N_3CO": "",
            "CUSTOMER_N_3HO": "",
            "CUSTOMER_N_2CE": "",
            "CUSTOMER_N_2CO": "",
            "CUSTOMER_N_3CE": "",
            "CUSTOMER_N_BCO": "",
            "CUSTOMER_N_CBE": "",
            "CUSTOMER_N_IHO": "",
            "CUSTOMER_N_IPC": "",
            "CUSTOMER_N_FBO": "",
            "CUSTOMER_N_IPO": "",
            "CUSTOMER_N_CPE": "",
            "CUSTOMER_N_CPO": "",
            "CUSTOMER_N_RPE": "",
            "CUSTOMER_N_RPO": "",
            "customer_n_non": "",
            "imagemob": "",
            "imagestb": "",
            "PRODUCT_CODE_3BO": "",
            "PRODUCT_CODE_3PO": "",
            "PRODUCT_CODE_3BE": "",
            "PRODUCT_CODE_3PE": "",
            "PRODUCT_CODE_IPE": "",
            "PRODUCT_CODE": "",
            "tier": "",
            "ETK_FIX_NAME": "",
            "ACCESS_NUMBER": "",
            "ALLOW_NTYPE": "",
            "COMMERCIAL_NAME_TH": "",
            "COMMERCIAL_NAME_EN": "",
            "packtype": "",
            "LINK_REGISTER": "",
            "CANCEL_ACCESS_NUMBER": "",
            "LINK_CANCEL": "",
            "TERM_AND_CONDITION_EN": "",
            "TERM_AND_CONDITION_TH": "",
            "PACKAGE_GROUP": "",
            "VIMMI_PRODUCT_ID": "",
            "PACKAGE_VALIDITY_UNIT": "",
            "SUPPORT_PLATFORM": "",
            "FREE": "",
            "PRICE_INCLUDE_VAT_BAHT": "",
            "SELL_IN_V_ACCOUNT": "",
            "CHARGE": ""
        }
    }])
}