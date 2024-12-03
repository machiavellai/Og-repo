"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Sequelize</li>
        <li>Java</li>
        <li>Springboot</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Team player</li>
      </ul>
    ),
  },
  // {
  //   title: "Soft Skills",
  //   id: "skills",
  //   content: (
  //     <ul className="list-disc pl-2">
  //       <li>Node.js</li>
  //       <li>Express</li>
  //       <li>PostgreSQL</li>
  //       <li>Sequelize</li>
  //       <li>Java</li>
  //       <li>Springboot</li>
  //       <li>JavaScript</li>
  //       <li>React</li>
  //       <li>Team player</li>
  //     </ul>
  //   ),
  // },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const [tabs, setTabs] = useState("skills");
  const [isPending1, startTransition1] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const handleButtonChange = (id) => {
    startTransition1(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a Dedicated Full-Stack Developer and Product Designer with 3
            years of hands-on experience in building dynamic web and mobile
            applications. Proficient in HTML, CSS, JavaScript, Node.js, React,
            Java, Springboot/Spring, Next.js, End-to-end testing, Github, Git,
            Firbase, TypeScript, and React Native, with a strong foundation in
            both relational (PostgreSQL) and NoSQL (MongoDB) databases.. I am a
            team player and I am excited to work with others to create amazing
            applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
