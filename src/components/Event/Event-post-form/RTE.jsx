/* eslint-disable react/prop-types */
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label }) {
    return (
        <div className="w-full">
            <h1
                htmlFor={name}
                className="text-md mb-5 font-semibold text-blue-800 bg-white px-1"
            >
                {label}
            </h1>
            <Controller
                name={name || "aboutEvent"}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey="b2mvxcdu0zds9ecd6r5pgkzkoprpozk4zxq74d0zoxgshqxa"
                        value={value}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "preview",
                                "searchreplace",
                                "visualblocks",
                                "fullscreen",
                                "wordcount",
                            ],
                            toolbar:
                                "bold italic  aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}
