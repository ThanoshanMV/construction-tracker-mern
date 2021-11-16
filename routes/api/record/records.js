/**
 * Have routes for anything to deal with profiles,
 * fetching them, adding them, updating them
 */
const express = require('express');
//use express router
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Admin = require('../../../models/admin/User');
const Employee = require('../../../models/employee/User');
const Record = require('../../../models/record/Record');

// @route         POST api/records
// @description   Create or update records
// @access        Private

router.post(
  '/',
  [
    auth,
    [check('referenceNumber', 'Reference number is required').not().isEmpty()],
    [
      check('referenceNumber', 'Ref. num should begin with HDUC2020C').matches(
        'HDUC2020C'
      ),
    ],
    [
      check('contactNo', 'Please enter valid contact number')
        .trim()
        .isInt()
        .isLength({ min: 9, max: 10 }),
    ],
    [check('payment', 'Payment should be a number').trim().isDecimal()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //No errors matches('foo', 'foo', 'i')

    const {
      referenceNumber,
      dateOfApplicationRequested,
      purpose,
      stage1Comments,
      applicantAddress,
      constructionAddress,
      contactNo,
      payment,
      dateOfApplicationSubmitted,
      relatedDocumentsSubmitted,
      nbroRecommentationReport,
      stage2Comments,
      technicalRecommendation,
      stage3Comments,
      phiRecommendation,
      stage4Comments,
      rdaRecommendation,
      stage5Comments,
      dateOfApplicationForwardedToPlanningCommittee,
      planningCommitteeDecision,
      stage6Comments,
      dateOfPlanningCommitteeDecision,
      statusOfTheApplication,
      dateOfDecisionGivenToApplicant,
      stage7Comments,
    } = req.body;
    
    // Build record object
    const recordFields = new Object();
    recordFields.stage1 = new Object();
    recordFields.stage2 = new Object();
    recordFields.stage3 = new Object();
    recordFields.stage4 = new Object();
    recordFields.stage5 = new Object();
    recordFields.stage6 = new Object();
    recordFields.stage7 = new Object();

    recordFields.stage1.referenceNumber = referenceNumber;

    if (dateOfApplicationRequested)
      recordFields.stage1.dateOfApplicationRequested = dateOfApplicationRequested;
    if (purpose) recordFields.stage1.purpose = purpose;
    if (stage1Comments) recordFields.stage1.stage1Comments = stage1Comments;
    if (applicantAddress) recordFields.stage1.applicantAddress = applicantAddress;
    if (constructionAddress)
      recordFields.stage1.constructionAddress = constructionAddress;
    if (contactNo) recordFields.stage1.contactNo = contactNo;
    if (payment) recordFields.stage1.payment = payment;
    if (dateOfApplicationSubmitted)
      recordFields.stage2.dateOfApplicationSubmitted = dateOfApplicationSubmitted;
    if (relatedDocumentsSubmitted)
      recordFields.stage2.relatedDocumentsSubmitted = relatedDocumentsSubmitted;
    if (nbroRecommentationReport)
      recordFields.stage2.nbroRecommentationReport = nbroRecommentationReport;
    if (stage2Comments) recordFields.stage2.stage2Comments = stage2Comments;
    if (technicalRecommendation)
      recordFields.stage3.technicalRecommendation = technicalRecommendation;
    if (stage3Comments) recordFields.stage3.stage3Comments = stage3Comments;
    if (phiRecommendation) recordFields.stage4.phiRecommendation = phiRecommendation;
    if (stage4Comments) recordFields.stage4.stage4Comments = stage4Comments;
    if (rdaRecommendation) recordFields.stage5.rdaRecommendation = rdaRecommendation;
    if (stage5Comments) recordFields.stage5.stage5Comments = stage5Comments;
    if (dateOfApplicationForwardedToPlanningCommittee)
      recordFields.stage6.dateOfApplicationForwardedToPlanningCommittee = dateOfApplicationForwardedToPlanningCommittee;
    if (planningCommitteeDecision)
      recordFields.stage6.planningCommitteeDecision = planningCommitteeDecision;
    if (stage6Comments) recordFields.stage6.stage6Comments = stage6Comments;
    if (dateOfPlanningCommitteeDecision)
      recordFields.stage6.dateOfPlanningCommitteeDecision = dateOfPlanningCommitteeDecision;
    if (statusOfTheApplication)
      recordFields.stage7.statusOfTheApplication = statusOfTheApplication;
    if (dateOfDecisionGivenToApplicant)
      recordFields.stage7.dateOfDecisionGivenToApplicant = dateOfDecisionGivenToApplicant;
    if (stage7Comments) recordFields.stage7.stage7Comments = stage7Comments;

    try {
      // check if the record with same ref. number exist.
      let record = await Record.findOne({
        "stage1.referenceNumber": req.body.referenceNumber,
      });

      //if record exists
      if (record) {
        //Update
        record = await Record.findOneAndUpdate(
          { "stage1.referenceNumber": req.body.referenceNumber },
          { $set: recordFields },
          { new: true }
        );

        return res.json(record);
      }

      //if record not exist then CREATE it
      record = new Record(recordFields);

      await record.save();
      res.json(record);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route         GET api/records/:id
// @description   Get record by reference number
// @access        Private

router.get('/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id);
    // find the record by its reference number
    const record = await Record.findOne({ "stage1.referenceNumber": req.params.id });

    // if that particular record is not found
    if (!record) return res.status(400).json({ msg: 'Record not found!' });

    //if found
    return res.json(record);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route         DELETE api/records/:id
// @description   Delete a record
// @access        Private

router.delete('/:id', auth, async (req, res) => {
  try {
    // find the recordby its reference number
    const record = await Record.findOne({
      "stage1.referenceNumber": req.params.id,
    });

    // if that particular record is not found
    if (!record) return res.status(400).json({ msg: 'Record not found' });

    //if found
    // Remove record
    await Record.findOneAndRemove({ "stage1.referenceNumber": req.params.id });

    res.json({ msg: 'Record deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route         GET api/records/search/:searchBy/:id
// @description   Get all records by :searchBy/:id
// @access        Private

router.get('/search/:searchBy/:id', auth, async (req, res) => {
  try {
    // db.products.find({ sku: { $regex: /789$/ } });

    let id = req.params.id;
    let searchBy = req.params.searchBy;
    let record;

    if (searchBy == 'filterBy') {
      record = await Record.find({
        "stage1.referenceNumber": { $regex: id, $options: 'i' },
      });
      if (!Array.isArray(record) || !record.length) {
        record = await Record.find({ "stage1.purpose": { $regex: id, $options: 'i' } });
      }
    }

    if (searchBy == 'referenceNumber') {
      record = await Record.find({
        "stage1.referenceNumber": { $regex: id, $options: 'i' },
      });
    }

    if (searchBy == 'purpose') {
      record = await Record.find({ "stage1.purpose": { $regex: id, $options: 'i' } });
    }
    // if that particular record is not found
    if (!Array.isArray(record) || !record.length) {
      return res.status(201).json({ msg: 'Record not found' });
    }

    //if found
    console.log(req.params.id);
    console.log(id);
    console.log(searchBy);
    console.log(record);
    return res.json(record);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(201).json({ msg: 'Record not found' });
    }
    res.status(500).send('Server Error');
  }
});

//export the route
module.exports = router;
