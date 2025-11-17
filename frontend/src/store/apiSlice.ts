import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Lead } from "../types/Lead";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/" }), // Strapi default port
  tagTypes: ["Leads"],
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], string | void>({
      query: (status) => {
        const params: any = {};
        if (status) {
          params["filters[lead_status][$eq]"] = status; // <-- important!
        }
        return {
          url: "leads",
          params,
        };
      },
      transformResponse: (response: { data: any[] }) => {
        console.log(response.data);
        return response.data;
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Leads" as const, id })),
        { type: "Leads", id: "LIST" },
      ],
    }),

    addLead: builder.mutation<Lead, Partial<Lead>>({
      query: (lead) => ({
        url: "leads",
        method: "POST",
        body: { data: lead },
      }),
      transformResponse: (response: { data: any }) => ({
        id: response.data.id,
        ...response.data.attributes,
      }),
      invalidatesTags: [{ type: "Leads", id: "LIST" }],
    }),

    updateLead: builder.mutation<Lead, Partial<Lead> & Pick<Lead, "id">>({
      query: ({ id, ...patch }) => ({
        url: `leads/${id}`,
        method: "PUT",
        body: { data: patch },
      }),
      transformResponse: (response: { data: any }) => ({
        id: response.data.id,
        ...response.data.attributes,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Leads", id }],
    }),
  }),
});

export const { useGetLeadsQuery, useAddLeadMutation, useUpdateLeadMutation } =
  apiSlice;
