library(huxtable)

# Given a dataframe of n columns, (n > 0), sorted by columns
# with each column nested within the column to its left, returns a huxtable
# with row spans reflecting the nesting.
#
# For example, with this input data frame:
#
# aRefDes bankLabel switchType  switchChannel         fNo      loadRd
# 1  2004PSS-1    Bank 1   2ASwitch 2ASwitches0[3] 004-011-001  2011HRHB-1
# 2  2004PSS-1    Bank 1   2ASwitch 2ASwitches0[4]                        
# 3  2004PSS-1    Bank 1   2ASwitch 2ASwitches1[1] 004-034-001  2034HCCWUP
# 4  2004PSS-1    Bank 1   2ASwitch 2ASwitches1[2]                        
# 5  2004PSS-1    Bank 2   2ASwitch 2ASwitches0[7]                        
# 6  2004PSS-1    Bank 2   2ASwitch 2ASwitches0[8]                        
# 7  2004PSS-1    Bank 2   2ASwitch 2ASwitches1[5]                        
# 8  2004PSS-1    Bank 2   2ASwitch 2ASwitches1[6] 004-013-001 2013HECMRM1
# 9  2004PSS-2    Bank 1   2ASwitch 2ASwitches0[3] 004-011-001  2011HRHB-1
# 10 2004PSS-2    Bank 1   2ASwitch 2ASwitches0[4]                        
# 11 2004PSS-2    Bank 1   2ASwitch 2ASwitches1[1] 004-034-001  2034HCCWUP
# 12 2004PSS-2    Bank 1   2ASwitch 2ASwitches1[2]                        
# 13 2004PSS-2    Bank 2   2ASwitch 2ASwitches0[7]                        
# 14 2004PSS-2    Bank 2   2ASwitch 2ASwitches0[8]                        
# 15 2004PSS-2    Bank 2   2ASwitch 2ASwitches1[5]                        
# 16 2004PSS-2    Bank 2   2ASwitch 2ASwitches1[6] 004-013-001 2013HECMRM1
#
# the resulting huxtable is:
#
# 2004PSS-1   Bank 1   2ASwitch   2ASwitches0[3]   004-011-001   2011HRHB-1   
#                                 2ASwitches0[4]                              
#                                 2ASwitches1[1]   004-034-001   2034HCCWUP   
#                                 2ASwitches1[2]                              
#             Bank 2   2ASwitch   2ASwitches0[7]                              
#                                 2ASwitches0[8]                              
#                                 2ASwitches1[5]                              
#                                 2ASwitches1[6]   004-013-001   2013HECMRM1  
# 2004PSS-2   Bank 1   2ASwitch   2ASwitches0[3]   004-011-001   2011HRHB-1   
#                                 2ASwitches0[4]                              
#                                 2ASwitches1[1]   004-034-001   2034HCCWUP   
#                                 2ASwitches1[2]                              
#             Bank 2   2ASwitch   2ASwitches0[7]                              
#                                 2ASwitches0[8]                              
#                                 2ASwitches1[5]                              
#                                 2ASwitches1[6]   004-013-001   2013HECMRM1  
#
# J S Jenkins
# Systems Engineering Division
# Jet Propulsion Laboratory
# California Institute of Technology

hux_with_rowspans <- function(df) {

  # get first column
  
  first <- df[, 1, drop = FALSE]
  
  # count occurrences of first value in first column
  
  span <- length(which(df[, 1] == df[1, 1]))
  
  # create a huxtable with rowspan for this value of the first column
  
  ht <- set_rowspan(hux(first[1:span, 1, drop = FALSE], add_colnames = FALSE), 1, 1, span)
  
  if (ncol(df) > 1)

    # append recursive application to the same rows of the remaining columns
    
    ht <- add_columns(ht,
                      if (span > 1)
                        hux_with_rowspans(df[1:span, 2:ncol(df), drop = FALSE])
                      else
                        hux(df[1, 2:ncol(df), drop = FALSE], add_colnames = FALSE)
    )
  
  if (span < nrow(df))
    
    # append recursive application to remaining rows
    
    ht <- add_rows(ht, hux_with_rowspans(df[(span + 1):nrow(df), 1:ncol(df), drop = FALSE]))
  
  ht
}