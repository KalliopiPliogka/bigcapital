import { check, param, query, ValidationChain } from 'express-validator';
import BaseController from "api/controllers/BaseController";

export default class ContactsController extends BaseController {
  /**
   * @returns {ValidationChain[]}
   */
  get contactDTOSchema(): ValidationChain[] {
    return [
      check('first_name').optional().trim().escape(),
      check('last_name').optional().trim().escape(),

      check('company_name').optional().trim().escape(),
      check('display_name').exists().trim().escape(),

      check('email').optional().isEmail().trim().escape(),
      check('work_phone').optional().trim().escape(),
      check('personal_phone').optional().trim().escape(),

      check('billing_address_city').optional().trim().escape(),
      check('billing_address_country').optional().trim().escape(),
      check('billing_address_email').optional().isEmail().trim().escape(),
      check('billing_address_zipcode').optional().trim().escape(),
      check('billing_address_phone').optional().trim().escape(),
      check('billing_address_state').optional().trim().escape(),

      check('shipping_address_city').optional().trim().escape(),
      check('shipping_address_country').optional().trim().escape(),
      check('shipping_address_email').optional().isEmail().trim().escape(),
      check('shipping_address_zip_code').optional().trim().escape(),
      check('shipping_address_phone').optional().trim().escape(),
      check('shipping_address_state').optional().trim().escape(),

      check('note').optional().trim().escape(),
      check('active').optional().isBoolean().toBoolean(),
    ];
  }

  /**
   * Contact new DTO schema.
   * @returns {ValidationChain[]}
   */
  get contactNewDTOSchema(): ValidationChain[] {
    return [
      check('balance').optional().isNumeric().toInt(),
    ];
  }

  /**
   * Contact edit DTO schema.
   * @returns {ValidationChain[]}
   */
  get contactEditDTOSchema(): ValidationChain[] {
    return [

    ]
  }

  /**
   * @returns {ValidationChain[]}
   */
  get specificContactSchema(): ValidationChain[] {
    return [
      param('id').exists().isNumeric().toInt(),
    ];
  }

  /**
   * @returns {ValidationChain[]}
   */
  get bulkContactsSchema(): ValidationChain[] {
    return [
      query('ids').isArray({ min: 2 }),
      query('ids.*').isNumeric().toInt(),
    ]
  }
}