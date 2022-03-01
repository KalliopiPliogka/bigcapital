import React from 'react';
import { useLocation } from 'react-router-dom';
import { isEmpty, pick, isEqual, isUndefined } from 'lodash';
import DashboardInsider from 'components/Dashboard/DashboardInsider';
import { transformToEditForm } from './utils';

import {
  useCreditNote,
  useCreateCreditNote,
  useEditCreditNote,
  useItems,
  useCustomers,
  useWarehouses,
  useBranches,
  useSettingsCreditNotes,
  useInvoice,
} from 'hooks/query';

const CreditNoteFormContext = React.createContext();

/**
 * Credit note data provider.
 */
function CreditNoteFormProvider({ creditNoteId, baseCurrency, ...props }) {
  const { state } = useLocation();
  const invoiceId = state?.invoiceId;

  // Handle fetch customers data table or list
  const {
    data: { customers },
    isLoading: isCustomersLoading,
  } = useCustomers({ page_size: 10000 });

  // Handle fetching the items table based on the given query.
  const {
    data: { items },
    isLoading: isItemsLoading,
  } = useItems({
    page_size: 10000,
  });

  // Handle fetch  credit details.
  const { data: creditNote, isLoading: isCreditNoteLoading } = useCreditNote(
    creditNoteId,
    {
      enabled: !!creditNoteId,
    },
  );
  // Handle fetch invoice detail.
  const { data: invoice, isLoading: isInvoiceLoading } = useInvoice(invoiceId, {
    enabled: !!invoiceId,
  });

  // Fetch warehouses list.
  const {
    data: warehouses,
    isLoading: isWarehouesLoading,
    isSuccess: isWarehousesSuccess,
  } = useWarehouses();

  // Fetches the branches list.
  const {
    data: branches,
    isLoading: isBranchesLoading,
    isSuccess: isBranchesSuccess,
  } = useBranches();

  // Handle fetching settings.
  useSettingsCreditNotes();

  // Create and edit credit note mutations.
  const { mutateAsync: createCreditNoteMutate } = useCreateCreditNote();
  const { mutateAsync: editCreditNoteMutate } = useEditCreditNote();

  // Form submit payload.
  const [submitPayload, setSubmitPayload] = React.useState();

  const [selectCustomer, setSelectCustomer] = React.useState(null);

  // Determines whether the form in new mode.
  const isNewMode = !creditNoteId;

  // Determines whether the warehouse and branches are loading.
  const isFeatureLoading = isWarehouesLoading || isBranchesLoading;

  const newCreditNote = !isEmpty(invoice)
    ? transformToEditForm({
        ...pick(invoice, ['customer_id', 'currency_code', 'entries']),
      })
    : [];

  // Determines whether the foreign customer.
  const isForeignCustomer =
    !isEqual(selectCustomer?.currency_code, baseCurrency) &&
    !isUndefined(selectCustomer?.currency_code);

  // Provider payload.
  const provider = {
    items,
    customers,
    creditNote,
    branches,
    warehouses,
    submitPayload,
    baseCurrency,
    selectCustomer,
    setSelectCustomer,
    isNewMode,
    newCreditNote,
    isForeignCustomer,

    isItemsLoading,
    isCustomersLoading,
    isFeatureLoading,
    isBranchesSuccess,
    isWarehousesSuccess,

    createCreditNoteMutate,
    editCreditNoteMutate,
    setSubmitPayload,
  };

  const isLoading =
    isItemsLoading ||
    isCustomersLoading ||
    isCreditNoteLoading ||
    isInvoiceLoading;

  return (
    <DashboardInsider loading={isLoading} name={'credit-note-form'}>
      <CreditNoteFormContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useCreditNoteFormContext = () => React.useContext(CreditNoteFormContext);

export { CreditNoteFormProvider, useCreditNoteFormContext };
