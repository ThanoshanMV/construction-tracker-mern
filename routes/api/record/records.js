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
    [check('referenceNumber', 'Reference Number is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //No errors

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
    const recordFields = {};

    recordFields.referenceNumber = referenceNumber;

    if (dateOfApplicationRequested)
      recordFields.dateOfApplicationRequested = dateOfApplicationRequested;
    if (purpose) recordFields.purpose = purpose;
    if (stage1Comments) recordFields.stage1Comments = stage1Comments;
    if (applicantAddress) recordFields.applicantAddress = applicantAddress;
    if (constructionAddress)
      recordFields.constructionAddress = constructionAddress;
    if (contactNo) recordFields.contactNo = contactNo;
    if (payment) recordFields.payment = payment;
    if (dateOfApplicationSubmitted)
      recordFields.dateOfApplicationSubmitted = dateOfApplicationSubmitted;
    if (relatedDocumentsSubmitted)
      recordFields.relatedDocumentsSubmitted = relatedDocumentsSubmitted;
    if (nbroRecommentationReport)
      recordFields.nbroRecommentationReport = nbroRecommentationReport;
    if (stage2Comments) recordFields.stage2Comments = stage2Comments;
    if (technicalRecommendation)
      recordFields.technicalRecommendation = technicalRecommendation;
    if (stage3Comments) recordFields.stage3Comments = stage3Comments;
    if (phiRecommendation) recordFields.phiRecommendation = phiRecommendation;
    if (stage4Comments) recordFields.stage4Comments = stage4Comments;
    if (rdaRecommendation) recordFields.rdaRecommendation = rdaRecommendation;
    if (stage5Comments) recordFields.stage5Comments = stage5Comments;
    if (dateOfApplicationForwardedToPlanningCommittee)
      recordFields.dateOfApplicationForwardedToPlanningCommittee = dateOfApplicationForwardedToPlanningCommittee;
    if (planningCommitteeDecision)
      recordFields.planningCommitteeDecision = planningCommitteeDecision;
    if (stage6Comments) recordFields.stage6Comments = stage6Comments;
    if (dateOfPlanningCommitteeDecision)
      recordFields.dateOfPlanningCommitteeDecision = dateOfPlanningCommitteeDecision;
    if (statusOfTheApplication)
      recordFields.statusOfTheApplication = statusOfTheApplication;
    if (dateOfDecisionGivenToApplicant)
      recordFields.dateOfDecisionGivenToApplicant = dateOfDecisionGivenToApplicant;
    if (stage7Comments) recordFields.stage7Comments = stage7Comments;

    try {
      //We're getting req.user.id from token
      let record = await Record.findOne({
        referenceNumber: req.body.referenceNumber,
      });

      //if record exists
      if (record) {
        //Update
        record = await Record.findOneAndUpdate(
          { referenceNumber: req.body.referenceNumber },
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

//export the route
module.exports = router;
