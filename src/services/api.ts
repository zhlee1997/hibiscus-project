interface FormData {
  email: string;
  fullName: string;
  phoneNo: string;
  enquiryProduct: string;
  subject: string;
  message: string;
}

export const submitContactForm = async (formData: FormData) => {
  try {
    const response = await fetch(
      "https://8hselvlm5f.execute-api.ap-southeast-1.amazonaws.com/prod/{proxy+}",
      // "https://lnbvm0x9fh.execute-api.ap-southeast-1.amazonaws.com/dev/{proxy+}",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
