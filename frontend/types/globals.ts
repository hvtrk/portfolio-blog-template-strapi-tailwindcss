export interface GlobalResponse {
  data?: {
    favicon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    navbar: {
      navbarLogo: {
        logoImg: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      };
    };
    footer: {
      menuLinks: FooterLink[];
      categories: CategoryLink[];
      legalLinks: FooterLink[];
      socialLinks: FooterLink[];
      footerLogo: {
        logoText: string | null;
        logoImg: {
          url: string;
        };
      };
    };
    // Add other footer properties as needed
  };
  meta: {
    metaTitle: string;
    metaDescription: string;
    shareImage?: {
      data?: {
        attributes?: {
          url?: string;
          [key: string]: unknown;
        };
      };
    };
  };
}

export interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

export interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}
