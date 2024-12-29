export const post = async ({ request }) => {
  try {
    console.log("POST /api/users triggered");
    const newUser = await request.json();
    console.log("Received user data:", newUser);

    const user = await createUser(newUser);
    console.log("User successfully created:", user);

    return new Response(JSON.stringify(user), {
      status: 201, // Use 201 for created
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
