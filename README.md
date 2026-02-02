# GB Road Updates

A community-driven platform for real-time road conditions and updates in Gilgit-Baltistan, Pakistan.

## About the Project

There is currently no publicly available platform that provides real-time information about road conditions in Gilgit-Baltistan. This project aims to solve this core problem by providing a community-driven platform where users can report and view road conditions.

The goal of this project is to become the go-to platform for locals and tourists alike to get up-to-date information on road closures, blockages, and other travel-related issues in the region. By empowering the community to share information, we can make travel in Gilgit-Baltistan safer and more predictable.

## Built With

*   [Next.js](https://nextjs.org/) - React framework for production
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
*   [Supabase](https://supabase.io/) - The open source Firebase alternative

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/gb-road-updates.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env.local` file in the `my-app` directory and add your Supabase credentials:
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=YOUR_SUPABASE_ANON_KEY
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```

## Features

*   **View Road Conditions:** See a list of major roads and their current status (Open, Closed, etc.).
*   **User Authentication:** Users can create an account and log in to report road conditions.
*   **Report Road Issues:** Logged-in users can submit reports about road blockages, including the cause and duration.
*   **My Reports:** Users can view a list of their own submitted reports.
*   **Admin Dashboard:** Admins can view all submitted reports and verify or mark them as incorrect.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!
