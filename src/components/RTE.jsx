import React from "react";
import { Editor } from "@tinymce/tinymce-react"; 
import { Controller } from "react-hook-form";

function RTE({ name = "content", label, control, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && (
                <label className="text-gray-700 font-medium">
                    {label}
                </label>
            )}
            
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey="eslxniyc1lsndz98k0jmt6zgmdp9146gjlfet3ydzt4qpx4m"
                        value={value} 
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={(content) => onChange(content)}
                    />
                )}
            />
        </div>
    );
}

export default RTE;
