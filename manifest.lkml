project_name: "care_platr"

application: care_platr {
  label: "Care Platr"
  #url: "https://localhost:8080/bundle.js"  # Update to your production URL when ready
  file: "bundle.js"

  entitlements: {
    core_api_methods: [
      "me",                            # Basic user info
      "all_folders",                   # List all folders
      "folder",                        # Get folder info
      "folder_dashboards",             # List dashboards in folder
      "folder_looks",                  # List looks in folder
      "dashboard",                     # Get dashboard info
      "dashboard_dashboard_elements",  # Get dashboard elements
      "look",                          # Get look info
      "query",                         # Get query info
      "run_query",                     # Run queries for data
      "run_inline_query" ,             # Run inline queries if needed
      "lookml_model_explore",          # TO EXPLORE MODELS IN LOOKER
      "model_fieldname_suggestions"    # for field information
    ]

    # Other necessary permissions
    use_embeds: yes                    # For iframe embedding
    use_iframes: yes                   # For iframe support
    use_form_submit: yes               # For form submissions
    navigation: yes                    # For navigation support
    new_window: yes                    # Allow opening new windows
    local_storage: yes                 # For storing local data
    use_clipboard: yes                 # For copy functionality

    external_api_urls: [
      "https://localhost:8080",
      "https://api.the-odds-api.com"
    ]
  }
}
