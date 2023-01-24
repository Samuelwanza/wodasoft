import Router from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  SIGNUP_MUTATION,
} from "../mutations/auth";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_ROLE, GET_USER_PROFILE } from "../Queries/auth";
import { toast } from "react-toastify";

const getInitialState = () => {};

export const userContext = createContext(getInitialState);

const UserProvider = ({ children, ...props }) => {
  const [user, setUser] = useState(null);
  const [loginMutation, {}] = useMutation(LOGIN_MUTATION);
  const [signUpMutation, {}] = useMutation(SIGNUP_MUTATION);
  const [registerMutation, {}] = useMutation(CREATE_USER_MUTATION);
  const [profileQuery, {}] = useLazyQuery(GET_USER_PROFILE);

  const isAuthenticated = !user;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  async function signIn({ email, password }) {
    const { data: res } = await loginMutation({
      variables: { email, password },
    });

    console.log(res.login.jwt);

    setCookie(undefined, "auth_token", res.login.jwt, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    localStorage.setItem("user", JSON.stringify(res.login.user));

    setUser(JSON.parse(localStorage.getItem("user")));

    console.log("user from login: ", user);

    // await roleQuery({
    //   onCompleted: (data) => {
    //     console.log("role: ", data.me.role.name);

    //     if (data.me.role.name == "Administrator")
    //       Router.push("/professional-dashboard");
    //     else Router.push("/client-dashboard");
    //   },
    // });
    await profileQuery({
      onCompleted: (data) => {
        console.log(data.professionalDetails);
        const allUsers = data.professionalDetails.data;
        console.log("user_id:", user.id);

        console.log(allUsers);

        const user_profile = allUsers.find(
          (profile) => profile.attributes.user === user.id
        );
        console.log(user_profile);
        console.log("role: ", user_profile.attributes.role);
        const profileInfo = {
          id: user_profile.id,
          certification_link: user_profile.attributes.certification_link,
          Years_of_experience: user_profile.attributes.Years_of_experience,
          Field_of_specialisation:
            user_profile.attributes.Field_of_specialisation,
          image_url: user_profile.attributes.image_url,
          user: user_profile.attributes.user,
          role: user_profile.attributes.role,
          email: user_profile.attributes.email,
          bio: user_profile.attributes.bio,
          skills: user_profile.attributes.skills,
          name: user_profile.attributes.name,
        };

        localStorage.setItem("profile", JSON.stringify({ ...profileInfo }));

        if (profileInfo.role === "professional")
          Router.push("/professional-dashboard");
        else Router.push("/client-dashboard");
      },
    });
  }

  async function register({
    email,
    username,
    password,
    certification_link,
    Years_of_experience,
    Field_of_specialisation,
    image_url,
    role,
    bio,
    skills,
  }) {
    try {
      const { data: res } = await signUpMutation({
        variables: { username: username, email: email, password: password },
      });

      setCookie(undefined, "auth_token", res.register.jwt, {
        maxAge: 60 * 60 * 1, // 1 hour
      });
      console.log("user for register: ", res.register.user);

      const { data: profile } = await registerMutation({
        variables: {
          data: {
            certification_link,
            Years_of_experience,
            Field_of_specialisation,
            image_url,
            role,
            name: username,
            email: email,
            user: res.register.user.id,
            bio,
            skills,
            publishedAt: new Date(),
          },
        },
      });

      console.log("user for register: ", res.register.user);
      console.log("profile:", profile);
      console.log("user details:", profile.createProfessionalDetail);

      localStorage.setItem(
        "user",
        JSON.stringify(profile.createProfessionalDetail.data.attributes)
      );

      setUser(JSON.parse(localStorage.getItem("user")));
      await profileQuery({
        onCompleted: (data) => {
          const user_profile = data.professionalDetails.filter(
            (profile) => profile.data.user === user.id
          );
          console.log("role: ", user_profile.data.attributes.role);
          const profileInfo = {
            id: user_profile.data.id,
            certification_link: user_profile.data.attributes.certification_link,
            Years_of_experience:
              user_profile.data.attributes.Years_of_experience,
            Field_of_specialisation:
              user_profile.data.attributes.Field_of_specialisation,
            image_url: user_profile.data.attributes.image_url,
            user: user_profile.data.attributes.user,
            role: user_profile.data.attributes.role,
            email: user_profile.data.attributes.email,
            name: user_profile.data.attributes.name,
          };

          localStorage.setItem("profile", jSON.stringify({ ...profileInfo }));

          if (profileInfo.role == "professional")
            Router.push("/professional-dashboard");
          else Router.push("/client-dashboard");
        },
      });

      if (
        profile.createProfessionalDetail.data.attributes.role ===
          "professional" ||
        profile.createProfessionalDetail.data.attributes.role === "client"
      ) {
        const user_profile = {
          id: profile.createProfessionalDetail.data.id,
          certification_link:
            profile.createProfessionalDetail.data.attributes.certification_link,
          Years_of_experience:
            profile.createProfessionalDetail.data.attributes
              .Years_of_experience,
          Field_of_specialisation:
            profile.createProfessionalDetail.data.attributes
              .Field_of_specialisation,
          image_url: profile.createProfessionalDetail.data.attributes.image_url,
          user: profile.createProfessionalDetail.data.attributes.user,
          role: profile.createProfessionalDetail.data.attributes.role,
          email: profile.createProfessionalDetail.data.attributes.email,
          bio: profile.createProfessionalDetail.data.attributes.bio,
          skills: profile.createProfessionalDetail.data.attributes.bio,
          name: profile.createProfessionalDetail.data.attributes.name,
        };
        localStorage.setItem("profile", JSON.stringify({ ...user_profile }));
        Router.push("/verifyEmail");
      }

      // await roleQuery({
      //   onCompleted: (data) => {
      //     console.log("role: ", data.me.role.name);

      //     toast.success("Account created succesfully");

      //     Router.push("/verifyEmail");
      //   },
      // });
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  }

  const logout = async () => {
    await destroyCookie(undefined, "auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    setUser(null);
    isAuthenticated = false;
    Router.push("/");
  };

  return (
    <userContext.Provider
      {...props}
      value={{ isAuthenticated, user, signIn, register, logout }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
