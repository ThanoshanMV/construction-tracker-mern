import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createUserRecord,
  getCurrentRecordUser,
  deleteRecordUser,
  updateUserRecord,
} from '../../actions/record';
const moment = require('moment'); // require

const UserEditRecord = ({
  record: { record, loading },
  createUserRecord,
  getCurrentRecordUser,
  history,
  updateUserRecord,
}) => {
  const [formData, setFormData] = useState({
    referenceNumber: '',
    dateOfApplicationRequested: '',
    purpose: '',
    stage1Comments: '',
    applicantAddress: '',
    constructionAddress: '',
    contactNo: '',
    payment: '',
    dateOfApplicationSubmitted: '',
    relatedDocumentsSubmitted: '',
    nbroRecommentationReport: '',
    stage2Comments: '',
    technicalRecommendation: '',
    stage3Comments: '',
    phiRecommendation: '',
    stage4Comments: '',
    rdaRecommendation: '',
    stage5Comments: '',
    dateOfApplicationForwardedToPlanningCommittee: '',
    planningCommitteeDecision: '',
    stage6Comments: '',
    dateOfPlanningCommitteeDecision: '',
    statusOfTheApplication: '',
    dateOfDecisionGivenToApplicant: '',
    stage7Comments: '',
  });

  // we'll use useEffect to get current profile and fetch them
  useEffect(() => {
    getCurrentRecordUser(record.stage1.referenceNumber, history);

    // we are checking and fetching the data inside the form
    setFormData({
      referenceNumber:
        loading || !record.stage1.referenceNumber ? '' : record.stage1.referenceNumber,
      dateOfApplicationRequested:
        loading || !record.stage1.dateOfApplicationRequested
          ? ''
          : moment(record.stage1.dateOfApplicationRequested).format('YYYY-MM-DD'),
      purpose: loading || !record.stage1.purpose ? '' : record.stage1.purpose,
      stage1Comments:
        loading || !record.stage1.stage1Comments ? '' : record.stage1.stage1Comments,
      applicantAddress:
        loading || !record.stage1.applicantAddress ? '' : record.stage1.applicantAddress,
      constructionAddress:
        loading || !record.stage1.constructionAddress
          ? ''
          : record.stage1.constructionAddress,
      contactNo: loading || !record.stage1.contactNo ? '' : record.stage1.contactNo,
      payment: loading || !record.stage1.payment ? '' : record.stage1.payment,
      dateOfApplicationSubmitted:
        loading || !record.stage2.dateOfApplicationSubmitted
          ? ''
          : moment(record.stage2.dateOfApplicationSubmitted).format('YYYY-MM-DD'),
      relatedDocumentsSubmitted:
        loading || !record.stage2.relatedDocumentsSubmitted
          ? ''
          : record.stage2.relatedDocumentsSubmitted,
      nbroRecommentationReport:
        loading || !record.stage2.nbroRecommentationReport
          ? ''
          : record.stage2.nbroRecommentationReport,
      stage2Comments:
        loading || !record.stage2.stage2Comments ? '' : record.stage2.stage2Comments,
      technicalRecommendation:
        loading || !record.stage3.technicalRecommendation
          ? ''
          : record.stage3.technicalRecommendation,
      stage3Comments:
        loading || !record.stage3.stage3Comments ? '' : record.stage3.stage3Comments,
      phiRecommendation:
        loading || !record.stage4.phiRecommendation ? '' : record.stage4.phiRecommendation,
      stage4Comments:
        loading || !record.stage4.stage4Comments ? '' : record.stage4.stage4Comments,
      rdaRecommendation:
        loading || !record.stage5.rdaRecommendation ? '' : record.stage5.rdaRecommendation,
      stage5Comments:
        loading || !record.stage5.stage5Comments ? '' : record.stage5.stage5Comments,
      dateOfApplicationForwardedToPlanningCommittee:
        loading || !record.stage6.dateOfApplicationForwardedToPlanningCommittee
          ? ''
          : moment(record.stage6.dateOfApplicationForwardedToPlanningCommittee).format(
              'YYYY-MM-DD'
            ),
      planningCommitteeDecision:
        loading || !record.stage6.planningCommitteeDecision
          ? ''
          : record.stage6.planningCommitteeDecision,
      stage6Comments:
        loading || !record.stage6.stage6Comments ? '' : record.stage6.stage6Comments,
      dateOfPlanningCommitteeDecision:
        loading || !record.stage7.dateOfPlanningCommitteeDecision
          ? ''
          : moment(record.stage7.dateOfPlanningCommitteeDecision).format('YYYY-MM-DD'),
      statusOfTheApplication:
        loading || !record.stage7.statusOfTheApplication
          ? ''
          : record.stage7.statusOfTheApplication,
      dateOfDecisionGivenToApplicant:
        loading || !record.stage7.dateOfDecisionGivenToApplicant
          ? ''
          : moment(record.stage7.dateOfDecisionGivenToApplicant).format('YYYY-MM-DD'),
      stage7Comments:
        loading || !record.stage7.stage7Comments ? '' : record.stage7.stage7Comments,
    });
  }, [loading, getCurrentRecordUser]);

  // [loading] means when loading true, we'll run useEffect

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
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Creating onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    // adding true as this is an edit form
    createUserRecord(formData, history, true);
  };
  const update = (e) => {
    e.preventDefault();
    // adding true as this is an edit form
    updateUserRecord(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>
        Construction Approval Records <i className='fas fa-rocket'></i>
      </h1>

      <h2 className='large text-secondary'>Hatton-Dickoya Urban Council</h2>

      {/*stage 1 starts*/}

      <h3 className='lead text-secondary'>Stage 1: Request for Application</h3>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='lead' htmlFor='referenceNumber'>
            Reference Number
          </label>
          <input
            required={true}
            readOnly={true}
            type='text'
            placeholder='HDUC2020C001'
            name='referenceNumber'
            value={referenceNumber}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfApplicationRequested'>
            Date Requested for Application
          </label>
          <input
            type='date'
            name='dateOfApplicationRequested'
            value={dateOfApplicationRequested}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='purpose'>
            Purpose of the Application
          </label>
          <select name='purpose' value={purpose} onChange={(e) => onChange(e)}>
            <option value='0'>Application Purpose</option>
            <option value='Residence'>Residence</option>
            <option value='Commercial'>Commercial</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage1Comments'>
            Comments
          </label>
          <textarea
            name='stage1Comments'
            value={stage1Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='applicantAddress'>
            Address of Applicant
          </label>
          <textarea
            name='applicantAddress'
            value={applicantAddress}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Address'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='constructionAddress'>
            Address of the Contruction Site
          </label>
          <textarea
            name='constructionAddress'
            value={constructionAddress}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Construction Site'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='contactNo'>
            Contact No.
          </label>
          <input
            type='number'
            placeholder='07xxxxxxxx'
            name='contactNo'
            value={contactNo}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='payment'>
            Amount for the payment of Application
          </label>
          <input
            type='number'
            placeholder='Amount'
            name='payment'
            value={payment}
            onChange={(e) => onChange(e)}
          />
          {/* <input
            type='button'
            value='Save'
            onClick={update}
            className='btn btn-primary my-1'
          /> */}
        </div>

        {/*stage 1 ends*/}

        {/*stage 2 starts*/}

        <h3 className='my-2 lead text-secondary'>
          Stage 2: Submission of Application Stage
        </h3>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfApplicationSubmitted'>
            Date of Application Submitted
          </label>
          <input
            type='date'
            name='dateOfApplicationSubmitted'
            value={dateOfApplicationSubmitted}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='relatedDocumentsSubmitted'>
            Related Documents Submitted
          </label>
          <select
            name='relatedDocumentsSubmitted'
            value={relatedDocumentsSubmitted}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Related Documents Submitted</option>
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='nbroRecommentationReport'>
            NBRO Recommentation Report
          </label>
          <select
            name='nbroRecommentationReport'
            value={nbroRecommentationReport}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* NBRO Recommentation Report</option>
            <option value='Recommended'>Recommended</option>
            <option value='NotRecommended'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage2Comments'>
            Comments
          </label>
          <textarea
            name='stage2Comments'
            value={stage2Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input
            type='button'
            value='Save'
            onClick={update}
            className='btn btn-primary my-1'
          /> */}
        </div>

        {/*stage 2  ends*/}

        {/*stage 3 starts*/}

        <h3 className='my-2 lead text-secondary'>Stage 3: Technical Aspects</h3>

        <div className='form-group'>
          <label className='lead' htmlFor='technicalRecommendation'>
            Technical Recommendation by the Technical Officier
          </label>
          <select
            name='technicalRecommendation'
            value={technicalRecommendation}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Technical Recommendation</option>
            <option value='Recommended'>Recommended</option>
            <option value='NotRecommended'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage3Comments'>
            Comments
          </label>
          <textarea
            name='stage3Comments'
            value={stage3Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input
            type='button'
            value='Save'
            onClick={update}
            className='btn btn-primary my-1'
          /> */}
        </div>

        {/*stage 3 ends*/}

        {/*stage 4 starts*/}

        <h3 className='my-2 lead text-secondary'>Stage 4: Health Aspects</h3>

        <div className='form-group'>
          <label className='lead' htmlFor='phiRecommendation'>
            Health Recommendation by the Public Health Inspector
          </label>
          <select
            name='phiRecommendation'
            value={phiRecommendation}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Health Recommendation</option>
            <option value='Recommended'>Recommended</option>
            <option value='NotRecommended'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage4Comments'>
            Comments
          </label>
          <textarea
            name='stage4Comments'
            value={stage4Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input
            type='button'
            value='Save'
            onClick={update}
            className='btn btn-primary my-1'
          /> */}
        </div>

        {/*stage 4 ends*/}

        {/*stage 5 starts*/}

        <h3 className='my-2 lead text-secondary'>Stage 5: RDA/ PRDA Aspects</h3>

        <div className='form-group'>
          <label className='lead' htmlFor='rdaRecommendation'>
            RDA/ PRDA Recommendation (If needed)
          </label>
          <select
            name='rdaRecommendation'
            value={rdaRecommendation}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* RDA/ PRDA Recommendation</option>
            <option value='Nill'>Nill</option>
            <option value='RecommendedNBRO'>Recommended</option>
            <option value='NotRecommendedNBRO'>Not Recommended</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage5Comments'>
            Comments
          </label>
          <textarea
            name='stage5Comments'
            value={stage5Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
          {/* <input
            type='button'
            value='Save'
            onClick={update}
            className='btn btn-primary my-1'
          /> */}
        </div>

        {/*stage 5 ends*/}

        {/*stage 6 starts*/}

        <h3 className='my-2 lead text-secondary'>
          Stage 6: Planning Committee Aspects
        </h3>

        <div className='form-group'>
          <label
            className='lead'
            htmlFor='dateOfApplicationForwardedToPlanningCommittee'
          >
            Forwarded the Application to the Planning Committee on
          </label>
          <input
            type='date'
            name='dateOfApplicationForwardedToPlanningCommittee'
            value={dateOfApplicationForwardedToPlanningCommittee}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='planningCommitteeDecision'>
            Planning Committee Decision
          </label>
          <select
            name='planningCommitteeDecision'
            value={planningCommitteeDecision}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Planning Committee Recommendation</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
            <option value='CorrectionsForApproval'>
              Corrections for Approval
            </option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage6Comments'>
            {' '}
            Comments
          </label>
          <textarea
            name='stage6Comments'
            value={stage6Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfPlanningCommitteeDecision'>
            Date of Planning Committee Decision
          </label>
          <input
            type='date'
            name='dateOfPlanningCommitteeDecision'
            value={dateOfPlanningCommitteeDecision}
            onChange={(e) => onChange(e)}
          />
          {/* <input
            type='button'
            value='Save'
            onClick={update}
            className='btn btn-primary my-1'
          /> */}
        </div>

        {/*stage 6 ends*/}

        {/*stage 7 starts*/}

        <h3 className='my-2 lead text-secondary'>
          Stage 7: Status of the Application
        </h3>

        <div className='form-group'>
          <label className='lead' htmlFor='statusOfTheApplication'>
            Status
          </label>
          <select
            name='statusOfTheApplication'
            value={statusOfTheApplication}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Status</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
            <option value='CorrectionsForApproval'>
              Corrections for Approval
            </option>
          </select>
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='dateOfDecisionGivenToApplicant'>
            Decision of the Planning Committee is given to the Applicant on
          </label>
          <input
            type='date'
            name='dateOfDecisionGivenToApplicant'
            value={dateOfDecisionGivenToApplicant}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='lead' htmlFor='stage7Comments'>
            Comments
          </label>
          <textarea
            name='stage7Comments'
            value={stage7Comments}
            onChange={(e) => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Comments'
          ></textarea>
        </div>

        {/*stage 7 ends*/}

        <Link className='btn btn-light my-1' to='/user-dashboard'>
          Go Back
        </Link>
        <input type='submit' className='btn btn-primary my-1' />
        <button
          onClick={() => deleteRecordUser(record.referenceNumber, history)}
          className='btn btn-danger'
        >
          Delete Record
        </button>
      </form>
    </Fragment>
  );
};

UserEditRecord.propTypes = {
  createUserRecord: PropTypes.func.isRequired,
  getCurrentRecordUser: PropTypes.func.isRequired,
  deleteRecordUser: PropTypes.func.isRequired,
  updateUserRecord: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  record: state.record,
});

export default connect(mapStateToProps, {
  createUserRecord,
  getCurrentRecordUser,
  deleteRecordUser,
  updateUserRecord,
})(withRouter(UserEditRecord));
