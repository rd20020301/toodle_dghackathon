export class Tenant { 
    /**
     * tenantId.
     */
    tenantId?: string;
    /**
     * Name of Tenant.
     */
    name: string;
    /**
     * User tenant email.
     */
    email: string;
    status?: TenantStatus;
}

export type TenantStatus = 'Draft' | 'Trial' | 'Active' | 'Inactive';

export const TenantStatus = {
    Draft: 'Draft' as TenantStatus,
    Trial: 'Trial' as TenantStatus,
    Active: 'Active' as TenantStatus,
    Inactive: 'Inactive' as TenantStatus
};