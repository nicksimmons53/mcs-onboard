import { emptySplitApi } from "./emptySplit";

export const clientApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getClientsByUser: builder.query({
      query: userId => `clients?userId=${userId}`,
      providesTags: ["Clients"],
    }),
    getClientById: builder.query({
      query: clientId => `clients/${clientId}/profile-data`,
      providesTags: [
        "BasicInfo",
        "Addresses",
        "Contacts",
        "Programs",
        "Status",
        "Approvals",
      ],
    }),
    getClientDetails: builder.query({
      query: clientId => `details?clientId=${clientId}`,
      providesTags: ["Details"],
    }),
    getClientProgramDetails: builder.query({
      query: ({ program, clientId }) =>
        `programs/info?programName=${program}&clientId=${clientId}`,
      providesTags: ["ProgramInfo"],
    }),
    getClientProgramPricing: builder.query({
      query: ({ program, clientId }) =>
        `pricing/parts?programName=${program}&clientId=${clientId}`,
      providesTags: ["Pricing"],
    }),
    getCountertopOptions: builder.query({
      query: () => `pricing/countertop_options`,
    }),
    getSageData: builder.query({
      query: clientId => `clients/${clientId}/submittal-data`
    }),
    createClient: builder.mutation({
      query: body => ({
        url: "clients",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Clients"],
    }),
    createAddress: builder.mutation({
      query: ({ id, body }) => ({
        url: `clients/${id}/addresses`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Addresses"],
    }),
    createContact: builder.mutation({
      query: ({ id, body }) => ({
        url: `clients/${id}/contacts`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateClient: builder.mutation({
      query: ({ id, body }) => ({
        url: `clients/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Clients", "BasicInfo"]
    }),
    updatePrograms: builder.mutation({
      query: ({ id, body }) => ({
        url: `/programs?clientId=${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Programs"],
    }),
    updateDetails: builder.mutation({
      query: ({ id, type, body }) => ({
        url: `details?clientId=${id}&type=${type}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Details"],
    }),
    updateProgramInfo: builder.mutation({
      query: ({ type, body }) => ({
        url: `programs/info?programName=${type}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ProgramInfo"],
    }),
    updateProgramPricing: builder.mutation({
      query: ({ body }) => ({
        url: `pricing/parts`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Pricing"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `clients/${id}/status`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Status", "Clients"],
    }),
    updateApprovals: builder.mutation({
      query: ({ id, body }) => ({
        url: `clients/${id}/approvals`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Approvals"],
    }),
    updateAddress: builder.mutation({
      query: ({ clientId, id, body }) => ({
        url: `clients/${clientId}/addresses/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Addresses"],
    }),
    updateContact: builder.mutation({
      query: ({ clientId, id, body }) => ({
        url: `clients/${clientId}/contacts/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteAddress: builder.mutation({
      query: ({ clientId, id }) => ({
        url: `clients/${clientId}/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
    deleteContact: builder.mutation({
      query: ({ clientId, id }) => ({
        url: `clients/${clientId}/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteBillingParts: builder.mutation({
      query: ({ id }) => ({
        url: `pricing/parts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pricing"],
    }),
    deleteProgramParts: builder.mutation({
      query: ({ id, program }) => ({
        url: `pricing/parts/${id}/program?programName=${program}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pricing"],
    }),
    deleteProgramInfo: builder.mutation({
      query: ({ id, program }) => ({
        url: `programs/info?programName=${program}&clientId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProgramInfo"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetClientsByUserQuery,
  useGetClientByIdQuery,
  useGetClientDetailsQuery,
  useGetClientProgramDetailsQuery,
  useGetClientProgramPricingQuery,
  useGetCountertopOptionsQuery,
  useGetSageDataQuery,
  useCreateClientMutation,
  useCreateAddressMutation,
  useCreateContactMutation,
  useUpdateProgramsMutation,
  useUpdateDetailsMutation,
  useUpdateProgramInfoMutation,
  useUpdateProgramPricingMutation,
  useUpdateStatusMutation,
  useUpdateApprovalsMutation,
  useUpdateClientMutation,
  useUpdateAddressMutation,
  useUpdateContactMutation,
  useDeleteAddressMutation,
  useDeleteContactMutation,
  useDeleteBillingPartsMutation,
  useDeleteProgramPartsMutation,
  useDeleteProgramInfoMutation,
} = clientApi;
